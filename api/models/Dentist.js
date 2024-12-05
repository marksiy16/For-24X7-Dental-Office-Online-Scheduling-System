// Import mongoose and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Dentist schema
const DentistSchema = Schema({
  // Name of the dentist (required field)
  name: {
    type: String,
    required: true
  },
  // Specialization of the dentist (required field)
  specialization: {
    type: String,
    required: true
  },
  // Schedules of the dentist (required field)
  schedules: {
    type: String,
    required: true
  },
  // Date of birth (required field)
  dob: {
    type: Date,
    required: true
  },
  // Gender of the dentist (required field)
  gender: {
    type: String,
    required: true
  },
  // Address of the dentist (required field)
  address: {
    type: String,
    required: true
  },
  // Contact number of the dentist (required field)
  contactnumber: {
    type: String,
    required: true
  },
  // Avatar image URL (optional field)
  avatar: {
    type: String
  },
  // Date when the dentist record was created (defaults to current date)
  date: {
    type: Date,
    default: Date.now
  }
}); 

// Export the Dentist model
module.exports = Dentist = mongoose.model('dentists', DentistSchema);
