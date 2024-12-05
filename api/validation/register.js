// Import the Validator library and custom isEmpty utility
const Validator = require('validator');
const isEmpty = require('./is-empty');

// Validate registration input data
module.exports = function validateRegisterInput(data) {
  let errors = {}; // Initialize an empty errors object

  // Check for empty fields and assign default empty string if they are undefined
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Validate the name field
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'; // Error for name length
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'; 
  }

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

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'; 
  }

  // Validate the confirm password field
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required'; 
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'; 
  }

  // Return errors and a boolean indicating if the input is valid
  return {
    errors,
    isValid: isEmpty(errors) // `isValid` is true if there are no errors
  };
};
