// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, searchUsers } = require('../controllers/userController');

// Route to get all users
router.get('/', getUsers);

// Route to search users by username
router.get('/search', searchUsers);

module.exports = router;
