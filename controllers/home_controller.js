const Posts = require("../models/post");
const mongoose = require('mongoose');

module.exports.home = async function(req, res){
    
    // populate the user to each post
    // var x = await Posts.find().populate({path:'comments',populate:{path:'user',model:'User'},path:'comments'});

    // res.locals.posts = x;
    // console.log(x);
    // return res.render('home');

  
        const posts = await Posts.find({}).sort('-createdAt')
        .populate('user')
        .populate({
          path:'comments',
          populate:{
               path:'user',
               
          }
        });

      

       
        res.locals.posts = posts;
        return res.render('home');

   



}

// module.exports.actionName = function(req, res){}