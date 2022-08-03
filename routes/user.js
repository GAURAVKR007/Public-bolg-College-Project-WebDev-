const express = require('express');
const Router = express.Router();
const Article = require('../models/article')

Router.get('/new',function(req,res){
    res.render('new');
})

Router.post('/',function(req,res){
   const article = new Article({
    title:req.body.title,
    des:req.body.des,
    info:req.body.info
   })
   article.save().then(()=>{
    res.redirect('/')
   })
})

module.exports = Router;