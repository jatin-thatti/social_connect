{

function delcom(i)
{
    var form = $(i);

  
    form.click(function(e){
        e.preventDefault();
        
        $.ajax({

            type:'get',
            url:form.attr('href'),
            
          
            success:function(data){
            
               var x=$(`#commentId-${data.data.comment_id}`);
               
               x.remove();
                
            },
            error:function(){}

        })
    })
}

    function domComment(i)
    {
        var form = $(i);
        
        form.submit(function(e){
            e.preventDefault();
            
            $.ajax({

                url:form.attr('action'),
                type:'post',
                data:form.serialize(),
                success:function(data){
                    
                    
                    var list = $(`#comment-${data.data.post}`);
                    
                    let displayPostData=displayPost(data.data);

                    list.prepend(displayPostData);
                    
                    delcom(`#comment-a-${data.data._id}`);
                    
                    
                },
                error:function(){}

            })
        })
    }
    var commentForms = $('.comment-form');
    
    for(var i of commentForms )
    {
        domComment(i);
    }

    var displayPost=function(data)
    {
       
        return $(`
    
    <li id="commentId-${data._id}">
                        ${data.content}
                    <br>
                    <small>
                        ${data.user.name}
                    </small>
                   <a href="/comments/destroy/${data._id}" class="delComment" id="comment-a-${data._id}">X</a>
                </li>
    
    
    `);
    }
 
// _____________________________________________________________________________________________
    


    
    var commentDelLinks = $('.delComment');
    for(var i of commentDelLinks )
    {
        
        delcom(i);
    }



    


}