const BlogSchema = require('../Schema/BlogSchema')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const BlogImages = multer({ storage: storage }).single("image");

const AddBlog = (req, res) => {
    let Blog = new BlogSchema({
        Title: req.body.Title,
        image: req.file,
        SubTitle: req.body.SubTitle,
        Discription: req.body.Discription,
        UserId: req.body.UserId
    })

    Blog.save()
    
        .then((result) => {
            BlogSchema.populate(result, { path: 'UserId' })

            res.json({
                message: "Blog Added",
                data: result
            })
        })
        .catch((error) => {
            console.log(error);

        })
}
const ViewAllBlogs = (req, res) => {
    BlogSchema.find()
        .populate('UserId')
        .then((result) => {
            res.json({
                message: "View All Blogs",
                data: result
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

const EditBlog = (req, res) => {
    let datas = {
        Title: req.body.Title,
        SubTitle: req.body.SubTitle,
        Discription: req.body.Discription,
        image: req.file
    }
    BlogSchema.findByIdAndUpdate({ _id: req.params.id }, datas, { new: true })
        .then((result) => {
            res.json({
                message: "Blog Data Updated",
                data: result
            })
        })
        .catch((error) => {
            console.log(error);
        })
}
const DeleteBlog = (req, res) => {
    BlogSchema.findByIdAndDelete({ _id: req.body.id })
        .then((result) => {
            res.json({
                message: "Blog Deleted",
                data: result
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = { AddBlog, BlogImages, ViewAllBlogs, EditBlog, DeleteBlog }