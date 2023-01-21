// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
let contents = [];
let work = [];
const app = express();
app.set('view engine','ejs');
//  render uses the view engine to render a page we have mention in the view
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){
    let today = new Date();
    let fullDate = {
        weekday : "long",
        date:   "numeric",
        month:  "long"
    };
    let day = today.toLocaleDateString('en-US',fullDate);
        res.render('app', {title: day,items:contents});

});
app.post('/',function(req,res){
    let content = req.body.item;
    if (req.body.list === 'Work'){
        work.push(content);
        res.redirect('/work');
    }else{
        contents.push(content);
        res.redirect('/');
    }
 
});
app.post("/deleteItem", (req, res) => {
    const items = req.body.item;
    if(req.body.list === "Work"){
        work.splice(work.indexOf(items), 1);
        res.redirect("/work");
    }else{
        contents.splice(contents.indexOf(items), 1);
        res.redirect("/deleteItem");
    }
});
app.get('/work',function(req,res){
res.render('app',( {title:'Work List',items:work}));
});
app.get('/about',function(req,res){
res.render('about');
});

app.listen(3000,function(){
    console.log('Server is running on port 3000');
});

//to use anyone of the view engine we have to create a view directoey that contains the engine which will
//render the page for us