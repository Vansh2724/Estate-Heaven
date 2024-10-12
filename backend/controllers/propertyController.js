const Property = require('../models/Property'); 
const cloudinary = require('cloudinary').v2; // For image uploads
const User = require('../models/User'); // Assuming you have a User model
require('dotenv').config(); // Ensure .env file is loaded

// Create a new property listing
exports.listProperty = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : req.body.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required." });
        }

        // Validate latitude and longitude
        if (!req.body.latitude || !req.body.longitude) {
            return res.status(400).json({ success: false, message: "Latitude and longitude are required." });
        }

        // Handle images upload to Cloudinary
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "At least one image is required." });
        }

        const imageUploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { resource_type: 'auto', folder: 'property_images' },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload error:", error);
                            return reject(new Error("Image upload failed."));
                        }
                        resolve(result.secure_url);
                    }
                ).end(file.buffer);
            });
        });

        const imageUrls = await Promise.all(imageUploadPromises);

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
            images: imageUrls,
            userId: userId,
            latitude: req.body.latitude,   // Added latitude
            longitude: req.body.longitude,  // Added longitude
            createdAt: Date.now(),
        });

        const savedProperty = await newProperty.save();
        res.status(201).json({ success: true, message: "Property listed successfully", data: savedProperty });

    } catch (err) {
        console.error("Error listing property:", err);
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

// Search properties based on parameters
exports.searchProperties = async (req, res) => {
    try {
        const { city, state, pinCode, propertyType, bedrooms, bathrooms, halls, kitchens, area } = req.body;

        const query = {};
        if (city) query.city = city;
        if (state) query.state = state;
        if (pinCode) query.pincode = pinCode;
        if (propertyType) query.type = propertyType;
        if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };
        if (bathrooms) query.bathrooms = { $gte: Number(bathrooms) };
        if (halls) query.hall = { $gte: Number(halls) };
        if (kitchens) query.kitchen = { $gte: Number(kitchens) };
        if (area) query.area = { $gte: Number(area) };

        const properties = await Property.find(query);
        res.status(200).json({
            success: true,
            message: 'Properties retrieved successfully',
            data: properties,
        });
    } catch (error) {
        console.error('Error fetching properties:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error: Unable to fetch properties. Please try again later.',
            error: error.message,
        });
    }
};
