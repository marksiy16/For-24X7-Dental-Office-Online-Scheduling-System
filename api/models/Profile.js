// Import mongoose and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Profile schema
const ProfileSchema = new Schema({
  // User reference (linked to the 'users' collection)
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  // Date of birth (required field)
  dob: {
    type: Date,
    required: true
  },
  // Gender (required field)
  gender: {
    type: String,
    required: true
  },
  // Address (required field)
  address: {
    type: String,
    required: true
  },
  // Contact number (required field)
  contactnumber: {
    type: String,
    required: true
  },
  // Array of appointments (each with a dentist, title, and time range)
  appointments: [
    {
      // Reference to a dentist (linked to the 'dentists' collection)
      dentist: {
        type: Schema.Types.ObjectId,
        ref: 'dentists'
      },
      // Title of the appointment (required field)
      title: {
        type: String,
        required: true
      },
      // Appointment start time (required field)
      from: {
        type: Date,
        required: true
      },
      // Appointment end time (required field)
      to: {
        type: Date,
        required: true
      },
      // Appointment creation date (defaults to current date)
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  // Profile creation date (defaults to current date)
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the Profile model
module.exports = Profile = mongoose.model('profile', ProfileSchema);
