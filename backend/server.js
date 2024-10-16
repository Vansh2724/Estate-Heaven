const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();  // To load environment variables

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/propertyRoute');  // Import property routes
const propertyView = require('./routes/propertyView');  // Import property routes

const app = express();

// Allowed origins (local development + deployed frontend)
const allowedOrigins = [
  'http://localhost:3000',  // Local development
  'https://estate-heaven.onrender.com/'  // Replace with your deployed frontend URL
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests) or check if origin is in the allowedOrigins list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
  credentials: true,  // Allow cookies and authentication headers
}));

app.use(bodyParser.json());  // Parse incoming JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Support URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/property', propertyRoutes);  // Property listing routes
app.use('/api/propertyview', propertyView);  // Property view routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
