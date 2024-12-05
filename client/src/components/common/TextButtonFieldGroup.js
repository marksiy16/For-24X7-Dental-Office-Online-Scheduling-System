import React from 'react';             
import classnames from 'classnames';   
import propTypes from 'prop-types';    

// Defining the TextFieldGroup functional component
const TextFieldGroup = ({
  name,           // The 'name' attribute for the input field (required)
  placeholder,    // The placeholder text for the input field (optional)
  value,          // The current value of the input field (required)
  label,          // Label for the input field (optional)
  error,          // Error message (optional)
  info,           // Info message (optional)
  type,           // Type of the input field (required, e.g., 'text', 'email')
  onChange,       // Function to handle changes to the input field (required)
  disabled        // Disabled state for the input field (optional)
}) => {
  return (
    <div className="form-group"> {/* Wrapper div with Bootstrap class 'form-group' */}
      {/* Input field with dynamic classes */}
      <input 
        type={type}  // Input type (e.g., 'text', 'email', etc.)
        className={classnames('form-control form-control-lg', {
          'is-invalid': error  // Add 'is-invalid' class if there's an error
        })}
        placeholder={placeholder}  // Placeholder text for the input field
        name={name}                // Name attribute for the input field
        value={value}              // Current value of the input field
        onChange={onChange}        // Event handler for input changes
        disabled={disabled}        // Boolean to disable the input field if needed
      />
      {/* Conditionally render the info message if 'info' prop is provided */}
      {info && <small className='text-info text-muted'>{info}</small>}
      
      {/* Conditionally render the error message if 'error' prop is provided */}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

// Prop types validation to ensure the correct types are passed as props
TextFieldGroup.propTypes = {
  name: propTypes.string.isRequired,   // 'name' is a required string
  placeholder: propTypes.string,       // 'placeholder' is an optional string
  value: propTypes.string.isRequired,  // 'value' is a required string (value for the input field)
  error: propTypes.string,             // 'error' is an optional string (error message)
  info: propTypes.string,              // 'info' is an optional string (info message)
  type: propTypes.string.isRequired,   // 'type' is a required string (type of the input field)
  onChange: propTypes.func.isRequired, // 'onChange' is a required function (handler for input changes)
  disabled: propTypes.string           // 'disabled' is an optional string or boolean (to disable the input field)
}

// Default props in case the 'type' is not provided, default to 'text'
TextFieldGroup.defaultProps = {
  type: 'text' // Default type is 'text'
}

// Exporting the TextFieldGroup component for use in other parts of the application
export default TextFieldGroup;
