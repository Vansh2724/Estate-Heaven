const express = require('express');
const multer = require('multer');
const { listProperty } = require('../controllers/propertyController');

const router = express.Router();

// Set up multer for file uploads (image handling)
const upload = multer({ dest: 'uploads/' });  // Temp folder for storing uploaded files

// Create a property listing (upload up to 15 images)
router.post('/list', upload.array('images', 15), listProperty);

module.exports = router;
