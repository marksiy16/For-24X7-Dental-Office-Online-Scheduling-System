import React, { Component } from 'react';  
import { Link } from 'react-router-dom';  
import { connect } from 'react-redux';  
import propTypes from 'prop-types';  
import TextFieldGroup from '../common/TextFieldGroup';  
import SelectListGroup from '../common/SelectListGroup';  
import { updateProfile, getCurrentProfile } from '../../actions/profileActions';  
import { withRouter } from '../../withRouter';  
import isEmpty from '../../validation/is-empty';  
import moment from 'moment';  

// Class-based component for editing user profile
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',  // Profile ID
      dob: '',  // Date of birth
      gender: '',  // Gender
      address: '',  // Address
      contactnumber: '',  // Contact number
      errors: {}  // To store validation errors
    };

    // Bind methods to the current instance
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Lifecycle method called after the component mounts
  componentDidMount() {
    this.props.getCurrentProfile();  // Fetch the current profile data from the Redux store
  }

  // Lifecycle method for handling prop changes
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });  // Update errors if new errors are received
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If any field is empty, set it to an empty string
      profile.dob = !isEmpty(profile.dob) ? profile.dob : '';
      profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
      profile.address = !isEmpty(profile.address) ? profile.address : '';
      profile.contactnumber = !isEmpty(profile.contactnumber) ? profile.contactnumber : '';

      // Set the state with the profile data
      this.setState({
        id: profile._id,
        dob: moment(profile.dob).format("YYYY-MM-DD"),  // Format the date to YYYY-MM-DD
        gender: profile.gender,
        address: profile.address,
        contactnumber: profile.contactnumber,
      });
    }
  }

  // Event handler for form submission
  onSubmit(e) {
    e.preventDefault();  // Prevent default form submission

    // Prepare profile data
    const profileData = {
      dob: this.state.dob,
      gender: this.state.gender,
      address: this.state.address,
      contactnumber: this.state.contactnumber,
    };

    // Dispatch the updateProfile action with the current profile ID and updated data
    this.props.updateProfile(this.state.id, profileData, this.props.router.navigate);
  }

  // Event handler for form input changes
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });  // Update the corresponding state property
  }

  render() {
    const { errors } = this.state;  // Extract errors from state
    const options = [
      { label: 'Select Gender', value: 0 },  // Default option
      { label: 'Male', value: 'M' },  // Male option
      { label: 'Female', value: 'F' },  // Female option
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">  {/* Center the form on the page */}
              <Link to="/dashboard" className="btn btn-light">
                Go Back  {/* Link back to the dashboard */}
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>              
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
    );
  }
}

// PropTypes validation for the props passed into the component
CreateProfile.propTypes = {
  updateProfile: propTypes.func.isRequired,  // updateProfile action function
  getCurrentProfile: propTypes.func.isRequired,  // getCurrentProfile action function
  profile: propTypes.object.isRequired,  // profile data from Redux store
  errors: propTypes.object.isRequired,  // errors data from Redux store
};

// Map the Redux state to the component's props
const mapStateToProps = (state) => ({
  profile: state.profile,  // Get profile data from the Redux store
  errors: state.errors,  // Get errors data from the Redux store
});

// Connect the component to Redux store and wrap it with withRouter for routing
export default connect(mapStateToProps, { updateProfile, getCurrentProfile })(withRouter(CreateProfile));

