require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');
// const signUp = require('../controllers/userController');
const { signUp, login, logout } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// // Sign up
// router.post('/signup', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).send('User created');
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Log in
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).send('Invalid credentials');
//         }

//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;



// Sign up route
router.post('/signup', signUp);

// Log in route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});


module.exports = router;
