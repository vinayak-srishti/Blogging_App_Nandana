const express = require('express');
const router = express.Router();
const BlogController = require('./Controller/BlogController');
const UserController = require('./Controller/UserController');
const User = require('./Schema/UserSchema'); // ✅ Import the User model

// --- Blog Routes ---
router.post('/addBlog', BlogController.BlogImages, BlogController.AddBlog);
router.post('/ViewBlog', BlogController.ViewAllBlogs);
router.post('/UpdateBlog/:id', BlogController.BlogImages, BlogController.EditBlog);
router.post('/deleteBlog', BlogController.DeleteBlog);

// --- User Routes ---
router.post('/UserRegistration', UserController.UserRegistration);
router.post('/UserLogin', UserController.UserLogin);
router.post('/ForgotPassword', UserController.ForgotPassword);
router.post('/ViewAllUsers', UserController.ViewAllUsers);
router.post('/ViewOneUser/:id', UserController.ViewOneUser);
router.post('/EditUser/:id', UserController.EditUser);
router.post('/DeleteUser', UserController.DeleteUser);

// --- View Pending Users ---
router.get('/ViewPendingUsers', async (req, res) => {
  try {
    const pendingUsers = await User.find({ approved: false }); // ✅ find users where approved is false
    res.status(200).json({ success: true, data: pendingUsers });
  } catch (error) {
    console.error('Error fetching pending users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- Approve User by ID ---
router.put('/ApproveUser/:id', (req, res) => {
  const userId = req.params.id;

  User.findByIdAndUpdate(
    userId,
    { approved: true },
    { new: true } // ✅ Return the updated user document
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({
        message: 'User approved successfully',
        data: updatedUser,
      });
    })
    .catch((error) => {
      console.error('Error approving user:', error);
      res.status(500).json({ message: 'Server error while approving user' });
    });
});

module.exports = router;
