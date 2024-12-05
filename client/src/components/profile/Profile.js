import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import PropTypes from 'prop-types';  
import { withRouter } from '../../withRouter';  
import { Link } from 'react-router-dom';  
import ProfileHeader from './ProfileHeader';  
import Spinner from '../common/Spinner';  
import { getCurrentProfile } from '../../actions/profileActions';  

// Profile component to display user profile details
class Profile extends Component {

  // Lifecycle method called after the component mounts
  componentDidMount() {
    this.props.getCurrentProfile();  // Fetch the current profile when the component mounts
  }

  render() {
    const { profile, loading } = this.props.profile;  // Destructure profile and loading from props

    let profileContent;

    // Check if profile is null or still loading
    if (profile === null || loading) {
      profileContent = <Spinner />;  // Display loading spinner while profile is being fetched
    } else {
      profileContent = (
        <div>
          {/* Navigation to go back to the dashboard */}
          <div className="row">
            <div className="col-md-6">
              <Link to="/dashboard" className="btn btn-light mb-3 float-left">
                Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          {/* Display ProfileHeader component with profile data */}
          <ProfileHeader profile={profile} />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}  {/* Render the profile content or spinner */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// PropTypes validation for the component props
Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,  // getCurrentProfile action function
  profile: PropTypes.object.isRequired  // Profile object from Redux store
};

// Map the Redux state to the component's props
const mapStateToProps = (state) => ({
  profile: state.profile  // Get profile data from the Redux store
});

// Connect the component to Redux store and wrap it with withRouter for routing
export default connect(mapStateToProps, { getCurrentProfile })(withRouter(Profile));

