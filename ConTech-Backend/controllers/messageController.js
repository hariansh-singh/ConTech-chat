const Message = require('../models/Message');
const User = require('../models/User');

// Send a message
exports.sendMessage = async (req, res) => {
    const { recipientUsername, content } = req.body;
    const senderId = req.user.id; // Get sender's ID from authenticated user

    if (!recipientUsername || !content) {
        return res.status(400).json({ message: 'Recipient username and content are required' });
    }

    try {
        // Find recipient user by username
        const recipient = await User.findOne({ username: recipientUsername });
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        // Create new message
        const newMessage = new Message({
            sender: senderId,
            recipient: recipient._id,
            content,
            timestamp: new Date()
        });

        await newMessage.save();

        // Optionally, you could send a response with the saved message or just a success message
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get messages for a user
exports.getMessages = async (req, res) => {
    const userId = req.user.id; // Get user's ID from authenticated user

    try {
        const messages = await Message.find({
            $or: [{ sender: userId }, { recipient: userId }]
        }).sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
