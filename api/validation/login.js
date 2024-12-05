// Import the Validator library and custom isEmpty utility
const Validator = require('validator');
const isEmpty = require('./is-empty');

// Validate login input data
module.exports = function validateLoginInput(data) {
  let errors = {}; // Initialize an empty errors object

  // Check for empty fields and assign default empty string if they are undefined
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';    

  // Validate the email field
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'; 
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'; 
  }

  // Validate the password field
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'; 
  }    

  // Return errors and a boolean indicating if the input is valid
  return {
    errors,
    isValid: isEmpty(errors) // `isValid` is true if there are no errors
  };
};
