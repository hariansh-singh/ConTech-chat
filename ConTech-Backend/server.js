// require('dotenv').config();
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');

// const authRoutes = require('./routes/auth');
// const messageRoutes = require('./routes/messages');
// const userRoutes = require('./routes/users');
// const { MONGO_URI } = require('./config');

// const app = express();
// const server = http.createServer(app);

// const multer = require('multer');
// // const upload = multer({ dest: 'uploads/' });

// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:5173", // Frontend URL
//         methods: ["GET", "POST"],
//         allowedHeaders: ["Content-Type"],
//         credentials: true,
//     }
// });


// // Multer setup for Cloudinary
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'avatars', // Cloudinary folder where avatars will be stored
//       allowedFormats: ['jpg', 'jpeg', 'png']
//     }
//   });
//   const upload = multer({ storage: storage });


//   // Routes
// // app.post('/api/users/upload-avatar', upload.single('avatar'), (req, res) => {
// //     if (req.file) {
// //       res.status(200).json({ avatarUrl: req.file.path });
// //     } else {
// //       res.status(400).json({ message: 'No file uploaded' });
// //     }
// //   });

// // Route to handle avatar uploads
// // app.post('/api/users/upload-avatar', upload.single('avatar'), uploadAvatar);

// // Middleware
// // app.use(cors());
// app.use(cors({
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser()); // Add cookie parser middleware

// // MongoDB connection
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.post('/api/users/upload-avatar', upload.single('avatar'), (req, res) => {
//     if (req.file) {
//       res.status(200).json({ avatarUrl: req.file.path });
//     } else {
//       res.status(400).json({ message: 'No file uploaded' });
//     }
//   });
// app.use('/api/auth', authRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/users', userRoutes);

// // Socket.io setup
// io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('sendMessage', (message) => {
//         io.emit('receiveMessage', message);
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Import routes
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');
const { MONGO_URI } = require('./config');

const app = express();
const server = http.createServer(app);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars', // Cloudinary folder where avatars will be stored
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});
const upload = multer({ storage: storage });

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Add cookie parser middleware

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Route to handle avatar uploads
app.post('/api/users/upload-avatar', upload.single('avatar'), (req, res) => {
  if (req.file) {
    res.status(200).json({ avatarUrl: req.file.path });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
