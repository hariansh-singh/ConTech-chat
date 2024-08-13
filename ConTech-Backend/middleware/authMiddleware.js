require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); // Debug log

    // Extract the token from the authorization header
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    console.log('Token:', token); // Debug log

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error); // Debug log
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
