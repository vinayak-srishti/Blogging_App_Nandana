const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/BlogApp')

var DB = mongoose.connection
DB.on('error',()=>{
    console.log('error');
})
DB.once('open',()=>{
    console.log('Database Connected');
})

module.exports = DB;
