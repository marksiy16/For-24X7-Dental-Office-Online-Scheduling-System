import React from 'react';             
import classnames from 'classnames';   
import propTypes from 'prop-types';    

// Defining the TextFieldGroup functional component
const TextFieldGroup = ({
  name,           // The 'name' attribute for the input field (required)
  placeholder,    // The placeholder text for the input field (optional)
  value,          // The current value of the input field (required)
  label,          // The label text for the input field (optional)
  error,          // Error message for input validation (optional)
  info,           // Info or hint message for the input field (optional)
  type,           // Type of the input field (required, e.g., 'text', 'email')
  onChange,       // Function to handle changes to the input field (required)
  disabled        // Boolean to disable the input field (optional)
}) => {
  return (
    <div className="form-group"> {/* Wrapper div with Bootstrap's 'form-group' class for styling */}
      
      {/* The input field with dynamic className */}
      <input 
        type={type}  // Input type (e.g., 'text', 'email', 'password', etc.)
        className={classnames('form-control form-control-lg', {
          'is-invalid': error  // Conditionally apply 'is-invalid' class if there's an error
        })}
        placeholder={placeholder}  // The placeholder text to display in the input field
        name={name}                // The 'name' attribute that identifies the input field
        value={value}              // The current value of the input field (from state or parent component)
        onChange={onChange}        // The event handler to call when the input changes
        disabled={disabled}        // Disables the input field if the 'disabled' prop is true or provided
      />
      
      {/* Conditionally render the info text if the 'info' prop is provided */}
      {info && <small className='text-info text-muted'>{info}</small>}
      
      {/* Conditionally render the error message if the 'error' prop is provided */}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

// Prop types validation to ensure the correct types are passed as props
TextFieldGroup.propTypes = {
  name: propTypes.string.isRequired,   // 'name' is a required string (field name)
  placeholder: propTypes.string,       // 'placeholder' is an optional string (placeholder text)
  value: propTypes.string.isRequired,  // 'value' is a required string (input field value)
  error: propTypes.string,             // 'error' is an optional string (validation error message)
  info: propTypes.string,              // 'info' is an optional string (additional info text)
  type: propTypes.string.isRequired,   // 'type' is a required string (input type, e.g., 'text')
  onChange: propTypes.func.isRequired, // 'onChange' is a required function (handles input changes)
  disabled: propTypes.string           // 'disabled' is an optional string or boolean (to disable the input field)
}

// Default props for the component
TextFieldGroup.defaultProps = {
  type: 'text' // Default type is 'text' if not specified
}

// Exporting the TextFieldGroup component for use in other parts of the application
export default TextFieldGroup;

