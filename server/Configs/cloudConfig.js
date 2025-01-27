const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your account details
cloudinary.config({
  cloud_name: 'dhmnfhipn',
  api_key: '614921894965577',
  api_secret: 'pHhE8VjYYVbFMR0eb262G4Nwn_Y',
});

module.exports = cloudinary;