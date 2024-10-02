const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();  // To load environment variables

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/propertyRoute');  // Import property routes
const propertyView = require('./routes/propertyView');  // Import property routes

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin (React app)
    methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
    credentials: true,               // Allow cookies and authentication headers
}));

app.use(bodyParser.json());  // Parse incoming JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Support URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/property', propertyRoutes);  // Property listing routes
app.use('/api/propertyview', propertyView);  // Property listing routes

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

