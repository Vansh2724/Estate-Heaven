// Import models
const User = require('../models/User');
const Property = require('../models/Property');
const { log } = require('console');

// GET user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Failed to fetch profile.' });
    }
};

// PUT update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { firstName, lastName, phone },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Failed to update profile.' });
    }
};

// GET properties listed by a specific user
exports.getUserProperties = async (req, res) => {
    try {
        const properties = await Property.find({ userId: req.params.userId });
        res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching user properties:', error);
        res.status(500).json({ message: 'Failed to fetch properties.' });
    }
};

// DELETE a property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found.' });
        }
        res.status(200).json({ message: 'Property deleted successfully.' });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ message: 'Failed to delete property.' });
    }
};

// PUT update property details
exports.updateProperty = async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.propertyId,
            req.body,
            { new: true }
        );
        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found.' });
        }
        res.status(200).json(updatedProperty);
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ message: 'Failed to update property.' });
    }
};
