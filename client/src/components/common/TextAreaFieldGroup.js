import React from 'react';             
import classnames from 'classnames';   
import propTypes from 'prop-types';    

// Defining the TextAreaFieldGroup functional component
const TextAreaFieldGroup = ({
  name,           // The 'name' attribute for the textarea field (required)
  placeholder,    // The placeholder text for the textarea (optional)
  value,          // The current value of the textarea (required)
  error,          // Error message (optional)
  info,           // Info message (optional)
  onChange        // Function to handle changes to the textarea (required)
}) => {
  return (
    <div className="form-group"> {/* A wrapper div with Bootstrap's form-group class */}
      
      {/* Textarea field with dynamic classes */}
      <textarea        
        className={classnames('form-control form-control-lg', {
          'is-invalid': error  // Conditionally add 'is-invalid' class if there's an error
        })}
        placeholder={placeholder}  // The placeholder text for the textarea
        name={name}                // Name attribute to associate the textarea with the form field
        value={value}              // The current value of the textarea
        onChange={onChange}        // The onChange handler to capture the textarea changes
      />
      
      {/* Conditionally render info text if 'info' prop is provided */}
      {info && <small className='text-info text-muted'>{info}</small>}
      
      {/* Conditionally render error message if 'error' prop is provided */}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

// Prop types validation to ensure the correct types are passed as props
TextAreaFieldGroup.propTypes = {
  name: propTypes.string.isRequired,   // 'name' is a required string
  placeholder: propTypes.string,       // 'placeholder' is an optional string
  value: propTypes.string.isRequired,  // 'value' is a required string (value for the textarea)
  error: propTypes.string,             // 'error' is an optional string (error message)
  info: propTypes.string,              // 'info' is an optional string (info message)
  onChange: propTypes.func.isRequired  // 'onChange' is a required function (handler for textarea changes)
}

// Exporting the TextAreaFieldGroup component for use in other parts of the app
export default TextAreaFieldGroup;

