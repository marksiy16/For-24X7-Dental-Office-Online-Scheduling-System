// Import the Validator library and custom isEmpty utility
const Validator = require('validator');
const isEmpty = require('./is-empty');

// Validate appointment input data
module.exports = function validateAppointmentInput(data) {
  let errors = {}; // Initialize an empty error object

  // Check for empty fields and assign default empty string if they are undefined
  data.title = !isEmpty(data.title) ? data.title : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';
  data.dentist = !isEmpty(data.dentist) ? data.dentist : '';

  // Validate each field and add error messages if they are empty
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required'; 
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'Date From field is required'; 
  }

  if (Validator.isEmpty(data.to)) {
    errors.to = 'Date To field is required'; 
  }

  if (Validator.isEmpty(data.from) && Validator.isEmpty(data.to)) {
    errors.appointmentdate = 'Appointment Date field is required'; 
  }

  if (Validator.isEmpty(data.dentist)) {
    errors.dentistname = 'Dentist field is required'; 
  }

  // Return the errors object and whether the input is valid
  return {
    errors,
    isValid: isEmpty(errors) // `isValid` is true if there are no errors
  };
};
