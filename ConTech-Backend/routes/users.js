// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, searchUsers, uploadAvatar, signUp } = require('../controllers/userController');
const multer = require('multer');
const { upload } = require('../multer/multer');

// Route to sign up
router.post('/signup', upload.single('avatar'), signUp);

// Route to get all users
router.get('/', getUsers);

// Route to search users by username
router.get('/search', searchUsers);

router.post('/upload-avatar', upload.single('avatar'), uploadAvatar); // Use the uploadAvatar function from the controller

// router.post('/upload-avatar', (req, res) => {
//     res.json({ message: 'Avatar upload route' });
// })

// router.post('/upload-avatar',upload.single('avatar'), uploadAvatar)
module.exports = router;
