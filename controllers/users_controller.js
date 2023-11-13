const user = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    
    
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res){

   var name = req.body.name;
   var email = req.body.email;
   var password = req.body.password;
   var confirm_password = req.body.confirm_password;
   const member = await user.findOne({email:email});
   if(password!=confirm_password||(member))return res.redirect('back');

   const curUser = await user.create({name:name,email:email,password:password});

   console.log(curUser);
   return res.redirect('/users/sign-in');
   



}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    // TODO later
}