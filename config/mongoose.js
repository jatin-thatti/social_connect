const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Project");

const db = mongoose.connection;

db.once('open',()=>{console.log('connected to the database')});

module.exports = db;