const jwt = require('jsonwebtoken');
const User = require('../../../models/user')
module.exports.createSession = async function(req,res)
{
    const user = await User.findOne({email:req.body.email});
    if(!user||user.password!=req.body.password){

        return res.json(422,{
            message:'username or password invalid'
        });

    }
    else{

        return res.json(200,{

            message:'successfully logged',
            data:{

                    token:jwt.sign(user.toJSON(),'sldfjlsj',{expiresIn:100*60*100})
            
            }
        })

    }
}