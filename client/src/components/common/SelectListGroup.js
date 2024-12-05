import React from 'react'; 
import classnames from 'classnames'; 
import propTypes from 'prop-types'; 

// Functional component definition
const SelectListGroup = ({
  name,        // The name of the select input (to associate with form data)
  value,       // The current value of the select input (to determine the selected option)
  error,       // Any error message to be displayed (if validation fails)
  info,        // Any additional info text (for hints or descriptions)
  onChange,    // A function to handle changes in the selected option
  options      // The list of options to be rendered inside the select dropdown
}) => {
  // Map over the options array and return an <option> element for each option
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  
  // Return the JSX to render the SelectListGroup
  return (
    <div className="form-group"> {/* A wrapper div with form-group class for Bootstrap styling */}
      <select        
        // Dynamically add classes based on the presence of the error prop
        className={classnames('form-control form-control-lg', {
          'is-invalid': error  // Add 'is-invalid' class if error is present
        })}        
        name={name}            // Set the 'name' attribute for the select input
        value={value}          // Set the current value of the select input
        onChange={onChange}>   // Bind the onChange event handler to track changes
        {selectOptions}        {/* Render the <option> elements created earlier */}
      </select>
      {info && <small className='text-info text-muted'>{info}</small>}  {/* Conditionally render info if it's provided */}
      {error && (<div className="invalid-feedback">{error}</div>)}     {/* Conditionally render error message if error is provided */}
    </div>
  );
}

// Prop types validation to ensure the correct types are passed as props
SelectListGroup.propTypes = {
  name: propTypes.string.isRequired,    // 'name' must be a string and is required
  value: propTypes.string.isRequired,   // 'value' must be a string and is required
  error: propTypes.string,              // 'error' is optional and should be a string
  info: propTypes.string,               // 'info' is optional and should be a string
  onChange: propTypes.func.isRequired,  // 'onChange' must be a function and is required
  options: propTypes.array.isRequired   // 'options' must be an array and is required
}

// Export the component so it can be used in other files
export default SelectListGroup;

