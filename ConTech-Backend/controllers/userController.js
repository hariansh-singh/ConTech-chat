// controllers/userController.js
require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Generate a token
User.prototype.generateToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: '1h' });
};

// Sign up
exports.signUp = async (req, res) => {
    const { username, email, password, avatar } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ username, email, password, avatar });
        await newUser.save();

        const token = newUser.generateToken();
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error signing up:', error);
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



exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};
