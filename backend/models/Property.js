const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  type: String,
  for: String,
  city: String,
  state: String,
  pincode: String,
  address: String,
  bedrooms: Number,
  hall: Number,
  kitchen: Number,
  bathrooms: Number,
  area: Number,
  ownerName: String,
  ownerContact: String,
  ownerEmail: String,
  images: [String],  // Array of image URLs from Cloudinary
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Link to the user who listed the property
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema);
