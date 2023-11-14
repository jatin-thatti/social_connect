const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.use(new LocalStrategy({usernameField:'email'},
    async function(username, password, done) {
        
        
        const user = await User.findOne({email:username});
        
        if(!user||(user.password!=password))return done(null,false);
        return done(null,user);

       
    }
  ));

passport.serializeUser(function(user,done)
{
    done(null,user.id);

});


passport.deserializeUser(async function(id,done)
{
    const user = await User.findById(id);
    done(null,user);
});

passport.checkAuthentication = function(req,res,next){

        if(req.isAuthenticated()){next();}
        else{
            return res.redirect('/users/sign-in');
        }

}

// setAuthenticatedUser in ejs files by setting in res.locals
passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated()){res.locals.user = req.user;}
    next();
        
}
module.exports = passport;