const Property = require('../models/Property');
const cloudinary = require('cloudinary').v2;
const User = require('../models/User');  // Assuming you have a User model

// Ensure to read from the .env file for the CLOUDINARY_URL
require('dotenv').config();

// Create a new property listing
exports.listProperty = async (req, res) => {
  try {
    // Assuming the user is authenticated, get the userId from req.user or req.body
    const userId = req.user ? req.user._id : req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const newProperty = new Property({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      type: req.body.type,
      for: req.body.for,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      address: req.body.address,
      bedrooms: req.body.bedrooms,
      hall: req.body.hall,
      kitchen: req.body.kitchen,
      bathrooms: req.body.bathrooms,
      area: req.body.area,
      ownerName: req.body.ownerName,
      ownerContact: req.body.ownerContact,
      ownerEmail: req.body.ownerEmail,
      images: req.body.images,
      userId: userId,  // Assign the userId
      createdAt: Date.now(),
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

