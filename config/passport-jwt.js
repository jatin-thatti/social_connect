const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const opts = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'sldfjlsj'
}

passport.use(new JwtStrategy(opts,async function(jwtPayLoad,done){

    try{
       
        const user =await User.findById(jwtPayLoad._id);
        if(user){return done(null,user);}
        else {return done(null,false);}
    }
    catch(err)
    {
        return done(err);
    }



}));


module.exports = passport;


