{
  
    let createPost = function()
    {   
        let postform = $('#post_form');
        
        postform.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:postform.serialize(),
                success:function(data)
                {
                    
                    
                    let unorderdlist = $('#post_list');
                    unorderdlist.prepend(displayPost(data.data.post));
                    
                    delPost($(`#a-${data.data.post._id}`))
                    
                    var commentForms = $('.comment-form');
    
                    for(var i of commentForms )
                    {
                        domComment(i);
                    }

                },
                error:function(err)
                {
                    console.log(err)
                }
                
            });
        })


    }
createPost();


let displayPost = function(post){
   
   return(
    `<li id="post-${post._id}">


    <p>
        ${post.content}
        <br>
        <small>
            ${post.user.name}
        </small>
       <a id="a-${post._id}" href="/posts/destroy/${post._id}">X</a>
    </p>
    <div class="post-comments">
        
            <form action="/comments/create" method="POST" class="comment-form">
                <input type="text" name="content" placeholder="Type Here to add comment...">
                <input type="hidden" name="post" value="${post._id }" >
                <input type="submit" value="Add Comment">
            </form>

     
    </div>

    <ul id="comment-${post._id}">
    
    </ul>


</li>`
    
    
    
    );

}



let delPost = function(alink)
{   
  
    var dlink=$(alink);
   
    dlink.click((e)=>
    {
            
       e.preventDefault();
        $.ajax({

            url:dlink.attr('href'),
            type:'get',
            success:function(data)
            {   
                let postId=data.data.data;
               
                let domPost=$(`#post-${postId}`);
                
                domPost.remove();
                
            },
            error:function(err){console.log(err);}
        })

    })

}
var alinks = $('.del-link')

for(var alink of alinks)
{
    delPost(alink);

}

}