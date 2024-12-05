// Import mongoose and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const UserSchema = Schema({
  // Name of the user (required field)
  name: {
    type: String,
    required: true
  },
  // Email address of the user (required field)
  email: {
    type: String,
    required: true
  },
  // Password for the user (required field)
  password: {
    type: String,
    required: true
  },
  // Avatar image URL (optional field)
  avatar: {
    type: String
  },
  // Date when the user was created (defaults to current date)
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the User model
module.exports = User = mongoose.model('users', UserSchema);
