const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudConfig.js');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Quickcuisine', 
    allowedFormats:['jpeg','jpg','png',]
  },
});

// Initialize Multer
const upload = multer({ storage: storage });

module.exports = upload;