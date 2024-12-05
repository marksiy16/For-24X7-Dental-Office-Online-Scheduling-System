const isEmpty = value =>
  value === undefined ||  // Check if the value is undefined
  value === null ||       // Check if the value is null
  (typeof value === 'object' && Object.keys(value).length === 0) ||  // Check if the value is an empty object
  (typeof value === 'string' && value.trim().length === 0);  // Check if the value is an empty string or a string with only whitespace

export default isEmpty;
