const Posts = require('../models/post');
const Comments = require('../models/comment');
module.exports.create = async function(req,res)
{
    if(!req.user)return res.redirect('/users/sign-in');
    const post = await (await Posts.create({user:req.user._id,content:req.body.content})).populate('user');
    
   
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            }
        });
    }
    res.redirect('back');

}

module.exports.destroy = async (req,res)=>{

    const post = await Posts.findById(req.params.id);
 
    if(post&&post.user==req.user.id){
        
         Comments.deleteMany({post:req.params.id});
        
        const y=await Posts.deleteOne(post);

        if(req.xhr)
        {
            return res.status(200).json({
                data:{data:post.id}
            });
        }

        

    }

    res.redirect('back');


}
