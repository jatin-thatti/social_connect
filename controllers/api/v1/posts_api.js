const Posts = require('../../../models/post');
const Comments = require('../../../models/comment');
module.exports.index = async function(req,res)
{
    
    const posts = await Posts.find({user:req.user._id});

    return res.json(200,{
        message:'post api',
        posts:posts
    });
}

module.exports.destroy = async (req,res)=>{

   try{ 
    const post = await Posts.findById(req.params.id);
   
    if(post && (post.user ==req.user.id)){
        

         Comments.deleteMany({post:req.params.id});
        
            const y=await Posts.deleteOne(post);


        return res.json(200,{
            message:'post deleted'
        }) ;
    }
else{

    
    return res.json(401,{
        message:'post not found or unable to autheraized'
    });
}  
   }catch(err){return res.json(401,{
    message:'post not found '
});}

}
