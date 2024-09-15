// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String }, // Field to store the reset token
  resetTokenExpiry: { type: Date } // Field to store the token expiry time
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
