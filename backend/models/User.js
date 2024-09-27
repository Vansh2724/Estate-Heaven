const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() { return !this.isGoogleUser; } }, // Required only if not a Google user
  resetToken: { type: String }, // Field to store the reset token
  resetTokenExpiry: { type: Date }, // Field to store the token expiry time
  isGoogleUser: { type: Boolean, default: false } // Indicates if the user signed up with Google
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
