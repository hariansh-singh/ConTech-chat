require('dotenv').config();
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { sendMessage, getMessages } = require('../controllers/messageController');

const router = express.Router();

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// Send message
router.post('/send', sendMessage);

// Get messages
router.get('/get', getMessages);

module.exports = router;
