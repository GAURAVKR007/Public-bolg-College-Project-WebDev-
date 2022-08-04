const express = require('express');
const Router = express.Router();
const Article = require('../models/article')

Router.get('/new',function(req,res){
    res.render('article/new');
})


// Update 
Router.get('/edit/:id',async (req,res)=>{
   const article_data = await Article.findById({_id:req.params.id})
   res.render('article/edit',{article:article_data})
})

Router.post('/edit/:id',async (req,res)=>{
   Article.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,docs)=>{
    if(err){
        console.log('Update Failed')
    }else{
        res.redirect('/')
    }
   })
 })

// Single Page View
Router.get('/:slug',async (req,res) => {
    const article = await Article.findOne({slug:req.params.slug})
    if(article==null){
        res.redirect('/')
    }else{
        res.render('article/show',{
            article:article
        })
    }
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

// Delete 

Router.get('/delete/:id',(req,res)=>{
    Article.findByIdAndDelete({_id:req.params.id},(err)=>{
        if(err){
            res.send('Sorry')
        }else{
            res.redirect('/')
        }
    })
})

module.exports = Router;