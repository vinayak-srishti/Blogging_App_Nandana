const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  PhoneNo: { type: Number, required: true },
  DOB: { type: Date, required: true },
  Password: { type: String, required: true },
  isActive: { type: Boolean, default: true, required: true },
  approved: { type: Boolean, default: false }  // <-- Added for admin approval
});

module.exports = mongoose.model('Users', UserSchema);
