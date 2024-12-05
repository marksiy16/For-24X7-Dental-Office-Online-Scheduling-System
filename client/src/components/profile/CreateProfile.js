import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import propTypes from 'prop-types';  
import TextFieldGroup from '../common/TextFieldGroup';  
import SelectListGroup from '../common/SelectListGroup';  
import { createProfile } from '../../actions/profileActions';  
import { withRouter } from '../../withRouter';  

// Class-based component for creating a new user profile
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dob: '',  // Date of birth
      gender: '',  // Gender
      address: '',  // User address
      contactnumber: '',  // Contact number
      errors: {}  // Error object to hold validation errors
    };

    // Bind methods to the current instance
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Component lifecycle method called when props change
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});  // Update errors if new errors are received
    }
  }

  // Event handler for form submission
  onSubmit(e) {
    e.preventDefault();  // Prevent default form submission

    // Prepare profile data to send in the request
    const profileData = {
      dob: this.state.dob,
      gender: this.state.gender,
      address: this.state.address,
      contactnumber: this.state.contactnumber,
    };

    // Call the createProfile action to submit the profile data to the server
    this.props.createProfile(profileData, this.props.router.navigate);
  }

  // Event handler for form input changes
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});  // Update state with the new value
  }

  render() {
    const { errors } = this.state;  // Extract errors from state
    const options = [
      { label: 'Select Gender', value: 0 },  // Default option
      { label: 'Male', value: 'M' },  // Male option
      { label: 'Female', value: 'F' }  // Female option
    ];

    return (
      <div className="create-profile">  {/* Wrapper for the profile creation page */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">  {/* Center the form on the page */}
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>  {/* Form submission event handler */}
                {/* Date of birth input */}
                <TextFieldGroup
                  name="dob"
                  type="date"
                  value={this.state.dob}
                  onChange={this.onChange}
                  error={errors.dob}
                  info="* Your Date of Birth (eg. 09/23/2001)"
                />
                {/* Gender select dropdown */}
                <SelectListGroup
                  placeholder="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={options}
                  error={errors.gender}
                  info="* (eg. Male or Female)"
                />
                {/* Address input */}
                <TextFieldGroup
                  placeholder="Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                  info="* (eg. 1234 Oak Street, Los Angeles, CA 90001)"
                />
                {/* Contact number input */}
                <TextFieldGroup
                  placeholder="Contact Number"
                  name="contactnumber"
                  value={this.state.contactnumber}
                  onChange={this.onChange}
                  error={errors.contactnumber}
                  info="* (eg. +44 20 7946 0958)"
                />
                {/* Submit button */}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// PropTypes validation for the props passed into the component
CreateProfile.propTypes = {
  createProfile: propTypes.func.isRequired,  // createProfile action must be passed in
  profile: propTypes.object.isRequired,  // profile data from the Redux store
  errors: propTypes.object.isRequired  // errors data for form validation
}

// Map the Redux state to the component's props
const mapStateToProps = (state) => ({
  profile: state.profile,  // Get the profile data from the Redux store
  errors: state.errors  // Get the errors data from the Redux store
});

// Connect the component to the Redux store and wrap it with withRouter to access routing props
export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));

