const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
// Routes
const userRouters = require("./routes/user"); 


const app = express();

// Mongoose connect 
mongoose.connect('mongodb://localhost:27017/publicblog',{
    useNewUrlParser:true
})

// View Engine 

app.use(expressLayouts);
app.set('view engine','ejs');

// Rout

app.get("/",function(req,res){
    res.render('index');
})

// Body Parser 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//userRouters
app.use('/article',userRouters)

// Public Folder for css and js

app.use(express.static('public'));

// PORT Config
const PORT = process.env.PORT || 7777;
app.listen(PORT,function(){
    console.log("server is on at port 7777");
})