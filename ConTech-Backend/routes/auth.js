require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');
const { signUp, login, logout } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Sign up route
// router.post('/signup', signUp);

// Log in route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});


module.exports = router;
