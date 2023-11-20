const express = require('express');
const app = express();
const port = 8000;
app.use(express.static("assets"));


const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportJwt = require('./config/passport-jwt');

const MongoStore = require('connect-mongo');
app.set('view engine', 'ejs');
app.use(express.urlencoded())
app.use(cookieParser());


app.use(session({
    name: 'just_connect',
    
    secret: 'hashcode###Gg',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    ,
    store:MongoStore.create({
               mongoUrl:'mongodb://127.0.0.1/Project',
                autoRemove:'disabled'
            })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



app.use('/', require('./routes'));

// set up the view engine



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
