// Import models
const User = require('../models/User');
const Property = require('../models/Property');

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

