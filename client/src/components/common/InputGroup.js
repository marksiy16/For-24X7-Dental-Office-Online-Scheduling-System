import React from 'react'; 
import classnames from 'classnames'; 
import propTypes from 'prop-types'; 

// Functional component definition
const InputGroup = ({
  name,          // Name attribute for the input field (to associate with form data)
  placeholder,   // Placeholder text for the input field (optional)
  value,         // Current value of the input field (required)
  error,         // Any error message to display (if validation fails)
  icon,          // Icon class name to display inside the input field (optional)
  type,          // Type of the input (e.g., text, password, etc.) (required)
  onChange       // Function to handle changes to the input field (required)
}) => {
  // Return JSX that represents the InputGroup component
  return (
    <div className="input-group mb-3"> {/* Bootstrap class to style the input group with margin-bottom */}
      
      <div className="input-group-prepend"> {/* A wrapper for the icon */}
        <span className="input-group-text"> {/* Add input group text (icon) */}
          <i className={icon} /> {/* Render the icon inside the input field */}
        </span>
      </div>
      
      <input       
        // Dynamically set CSS classes based on error presence
        className={classnames('form-control form-control-lg', {
          'is-invalid': error // Add 'is-invalid' class if error is present
        })}
        placeholder={placeholder} // Set the placeholder text (optional)
        name={name}               // Set the name of the input field
        value={value}             // Set the value of the input field
        onChange={onChange}       // Bind the onChange event handler to capture input changes
      />
      
      {/* Conditionally render the error message if 'error' prop is provided */}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  );
};

// Prop types validation to enforce the expected types for props
InputGroup.propTypes = {
  name: propTypes.string.isRequired,        // 'name' is a required string
  placeholder: propTypes.string,            // 'placeholder' is an optional string
  value: propTypes.string.isRequired,       // 'value' is a required string
  icon: propTypes.string,                   // 'icon' is an optional string (CSS class for the icon)
  error: propTypes.string,                  // 'error' is an optional string (error message)
  type: propTypes.string.isRequired,        // 'type' is a required string (e.g., 'text', 'password')
  onChange: propTypes.func.isRequired       // 'onChange' is a required function to handle input changes
};

// Default props to provide default values when props are not supplied by the parent
InputGroup.defaultProps = {
  type: 'text'  // If no 'type' is provided, default it to 'text'
};

// Export the component to make it available for use in other parts of the application
export default InputGroup;


