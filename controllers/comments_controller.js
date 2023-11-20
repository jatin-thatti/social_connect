const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.create = async function(req,res)
{
     const post = await Post.findById(req.body.post);
   if(post){
       const comment = await(await Comment.create({content:req.body.content,post:req.body.post,user:req.user._id})).populate('user');
   
        post.comments.push(comment._id);
        post.save();

        
        if(req.xhr)
        {
            return res.status(200).json({


                data:comment
            })
        }
        
    }
    res.redirect('/');



}

module.exports.destroy = async function(req,res)
{
    const comment = await Comment.findById(req.params.id);
    const post = await Post.findById(comment.post);
    
    if(comment && req.user.id==comment.user){
       
        const k = await Post.findOneAndUpdate(comment.post,{$pull:{comments:req.params.id}});
     
       const x = await Comment.deleteOne(comment);
      
        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment_id:req.params.id
                }
            })
        }
    }

  

    return res.redirect('back');

}