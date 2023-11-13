const express = require('express');
const app = express();
const port = 8000;

app.use(express.static('./assets'));
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');



app.use(express.urlencoded())
app.use(cookieParser());
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
