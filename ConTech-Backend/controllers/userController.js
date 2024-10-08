// controllers/userController.js
require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const cloudinary = require('../config/cloudinary');

// Generate a token
User.prototype.generateToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: '1h' });
};

// Sign up
// exports.signUp = async (req, res) => {
//     const { username, email, password, avatar } = req.body;

//     if (!username || !email || !password) {
//         return res.status(400).json({ message: 'Username, email, and password are required' });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const newUser = new User({ username, email, password, avatar });
//         await newUser.save();

//         const token = newUser.generateToken();
//         res.status(201).json({ token });
//     } catch (error) {
//         console.error('Error signing up:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


exports.signUp = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const avatarUrl = req.file ? req.file.path : null; // Handle avatar upload if present
  
      // Validate input data
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
      }
  
      // Create a new user
      const user = new User({ username, email, password, avatar: avatarUrl });
      await user.save();
  
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = user.generateToken();
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


//Logout
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Search for users by username
exports.searchUsers = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: 'Username query parameter is required' });
    }

    try {
        const users = await User.find({ username: new RegExp(username, 'i') }); // Case-insensitive search
        res.json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Avatar Handling
exports.uploadAvatar = async (req, res) => {
    try {
      const file = req.file; // Assuming you use multer for handling file uploads
  
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'avatars'
      });
  
      // Update user avatar URL in the database
      const user = await User.findById(req.user._id); // Assuming user ID is available in req.user
      user.avatar = result.secure_url;
      await user.save();                    
  
      res.status(200).json({ avatarUrl: result.secure_url });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
