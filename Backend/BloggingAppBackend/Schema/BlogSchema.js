const mongoose=require('mongoose')

const BlogSchema=new mongoose.Schema({
    Title:{type:String, required:true},
    image:{type:Object, required:true},
    SubTitle:{type:String, required:true},
    Discription:{type:String, required:true},
    UserId:{type:mongoose.Schema.Types.ObjectId, ref:'Users'}
})

module.exports=mongoose.model('Blogs',BlogSchema)