const UserSchema = require('../Schema/UserSchema')
  
const UserRegistration = (req, res) => {
    let User = new UserSchema({
        Name: req.body.Name,
        Email: req.body.Email,
        PhoneNo: req.body.PhoneNo,
        DOB: req.body.DOB,
        Password: req.body.Password
    })
    console.log(req.body)
    User.save()
    
        .then((result) => {
            res.json({
                message: "User Registration Succesfull",
                data: result
            })
        })
        .catch((error) => {
            console.log(error);
            res.json({
                err:error
            })
        })
}
const UserLogin = (req, res) => {
    const { Email, Password } = req.body
    UserSchema.findOne({ Email, Password })
        .then((result) => {
            if (!result) {
                res.json({
                    Message: "Invalid Email or Password"
                });
            } else {
                if (result.isActive == true) {
                    res.json({
                        Message: "User Login Successfully",
                        data: result
                    });
                }
            }

        })
        .catch((error) => {
            console.log(error);

        })
}
const ForgotPassword = (req, res) => {
    UserSchema.findOneAndUpdate({ Email: req.body.Email }, { Password: req.body.Password }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: "Spotted User",
                    data: result,
                });
            } else {
                res.status(401).json({ message: "Invalid Userid" });
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

const ViewAllUsers = (req, res) => {
    UserSchema.find({ isActive: true })
        .then((result) => {
            res.json({
                message: "View All Users",
                data: result
            })
        })
        .catch((error) => {
            console.log(error);
        })
}
const ViewOneUser = (req, res) => {
    UserSchema.find({ _id: req.params.id })
        .then((result) => {
            res.json({
                message: "View A Users",
                data: result
            })
        })
        .catch((error) => {
            console.log(error);
        })



}
const EditUser = (req, res) => {
    let datas = {
        Name: req.body.Name,
        Email: req.body.Email,
        PhoneNo: req.body.PhoneNo,
        DOB: req.body.DOB
    }
    UserSchema.findByIdAndUpdate(req.params.id, datas, { new: true })
        .then((result) => {
            res.json({
                message: "User Data Updated",
                data: result
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

const DeleteUser = (req, res) => {
    UserSchema.findByIdAndUpdate(req.body.id, { isActive: false })
        .then((result) => {
            res.json({
                message: "User Deleted",
                data: result
            })
        })
        .catch((error) => {
            console.log(error);
        })
}
module.exports = { UserRegistration,UserLogin, ForgotPassword, ViewAllUsers, ViewOneUser, EditUser, DeleteUser }