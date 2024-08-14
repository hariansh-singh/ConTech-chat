require('dotenv').config();

// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');  // Ensure you have JWT_SECRET in your config

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '/avatar.png' }
});

// Password hashing before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: '1h' });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
