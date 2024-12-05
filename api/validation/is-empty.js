// Utility function to check if a value is empty
const isEmpty = value =>
  value === undefined ||                      
  value === null ||                           
  (typeof value === 'object' && Object.keys(value).length === 0) || // Check if it's an empty object
  (typeof value === 'string' && value.trim().length === 0);  // Check if it's an empty or whitespace-only string

// Export the isEmpty function for use in other files
module.exports = isEmpty;
