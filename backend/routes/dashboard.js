const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/dashboardController');

const router = express.Router();

// Route to get user dashboard overview for a specific user
router.get('/profile/:userId', getUserProfile);

// Route to get specific user's listed properties
// router.get('/myproperties/:userId', getMyProperties);

// Route to update a specific user profile
router.put('/profile/:userId', updateUserProfile);

module.exports = router;
