const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
app.use(cors())

const PORT= 3002
const DB = require('./Database')
app.use(bodyParser.json())
const BlogRoute =require('../BlogRoute')
app.use('/Blog',BlogRoute)
app.use('/upload', express.static(path.join(__dirname,'upload')));


app.listen(PORT,()=>{
    console.log(`The server is running on ${PORT}`);
})