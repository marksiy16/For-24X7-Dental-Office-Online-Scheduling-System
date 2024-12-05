// Import the Validator library and custom isEmpty utility
const Validator = require('validator');
const isEmpty = require('./is-empty');

// Validate profile input data
module.exports = function validateProfileInput(data) {
  let errors = {}; // Initialize an empty errors object

  // Check for empty fields and assign default empty string if they are undefined
  data.dob = !isEmpty(data.dob) ? data.dob : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.contactnumber = !isEmpty(data.contactnumber) ? data.contactnumber : '';

  // Validate required fields: date of birth, gender, address, and contact number
  if (Validator.isEmpty(data.dob)) {
    errors.dob = 'Date of birth is required'; 
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender is required'; 
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address is required'; 
  }

  if (Validator.isEmpty(data.contactnumber)) {
    errors.contactnumber = 'Contact number is required'; 
  }

  // Return the errors and a boolean indicating if the input is valid
  return {
    errors,
    isValid: isEmpty(errors) // `isValid` is true if there are no errors
  };
};

