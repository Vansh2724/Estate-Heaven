const Property = require('../models/Property');
const cloudinary = require('cloudinary').v2; // For image uploads
const User = require('../models/User'); // Assuming you have a User model
require('dotenv').config(); // Ensure .env file is loaded

// Create a new property listing
exports.listProperty = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : req.body.userId;

        if (!userId) {
            console.error("User ID is required.");
            return res.status(400).json({ success: false, message: "User ID is required." });
        }

        // Validate latitude and longitude
        if (!req.body.latitude || !req.body.longitude) {
            console.error("Latitude and longitude are required.");
            return res.status(400).json({ success: false, message: "Latitude and longitude are required." });
        }

        // Handle images upload to Cloudinary
        if (!req.files || req.files.length === 0) {
            console.error("At least one image is required.");
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
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            createdAt: Date.now(),
        });

        const savedProperty = await newProperty.save();
        console.log("Property listed successfully:", savedProperty);
        res.status(201).json({ success: true, message: "Property listed successfully", data: savedProperty });

    } catch (err) {
        console.error("Error listing property:", err);
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

// Search properties based on parameters
exports.searchProperties = async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);

        const { city, state, pincode, propertyType, bedrooms, bathrooms, halls, kitchens, area, for: forParam, sort } = req.body;

        const query = {};
        if (city) query.city = city;
        if (state) query.state = state;
        if (pincode) query.pincode = pincode;
        if (propertyType) query.type = propertyType;
        if (forParam) query.for = forParam;
        if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };
        if (bathrooms) query.bathrooms = { $gte: Number(bathrooms) };
        if (halls) query.hall = { $gte: Number(halls) };
        if (kitchens) query.kitchen = { $gte: Number(kitchens) };
        if (area) query.area = { $gte: Number(area) };

        console.log("Constructed query:", query);

        const sortOptions = {};
        if (sort === 'priceAsc') sortOptions.price = 1;
        else if (sort === 'priceDesc') sortOptions.price = -1;
        else if (sort === 'areaAsc') sortOptions.area = 1;
        else if (sort === 'areaDesc') sortOptions.area = -1;

        console.log("Sort options applied:", sortOptions);

        const properties = await Property.find(query).sort(sortOptions);
        console.log("Found properties:", properties);

        if (properties.length === 0) {
            console.warn("No properties found matching the criteria:", query);
        }

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

