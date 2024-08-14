const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
