const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]


},{
    timestamps:true
});


const post = mongoose.model('Post',schema);
module.exports = post;

