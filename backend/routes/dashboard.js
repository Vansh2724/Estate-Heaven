const express = require('express');
const { 
    getUserProfile, 
    updateUserProfile, 
    getUserProperties, 
    deleteProperty, 
    updateProperty 
} = require('../controllers/dashboardController');

const router = express.Router();

// Route to get user dashboard profile
router.get('/profile/:userId', getUserProfile);

// Route to update user dashboard profile
router.put('/profile/:userId', updateUserProfile);

// Route to get specific user's listed properties
router.get('/myproperties/:userId', getUserProperties);

// Route to delete a property
router.delete('/myproperties/:propertyId', deleteProperty);

// Route to update property details
router.put('/myproperties/:propertyId', updateProperty);

module.exports = router;
