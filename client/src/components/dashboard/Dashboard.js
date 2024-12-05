import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Appointments from './Appointments';

class Dashboard extends Component {
  componentDidMount() {
    // Fetch the current user's profile data when the component is mounted
    this.props.getCurrentProfile();
  }

  // Handler to delete user account
  onDeleteClick(e) {
    this.props.deleteAccount();  // Dispatches the delete account action
  }

  render() {
    const { user } = this.props.auth;  // Extract logged-in user from Redux state
    const { profile, loading } = this.props.profile;  // Extract profile and loading state

    let dashboardContent;

    // Display the spinner if the profile is still loading or not fetched
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if the user has a profile
      if (Object.keys(profile).length > 0) {
        // Display profile data and appointment details if the profile exists
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/view-profile`}>{ user.name }</Link>
            </p>
            <ProfileActions />
            <Appointments appointments={profile.appointments} />
            <div style={{ marginBottom: '60px' }} />
            {/* Button to delete the user's account */}
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
          </div>
        );
      } else {
        // Display message if the user has not set up a profile yet
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>You have not yet setup a profile. Please add some info</p>
            {/* Button to navigate to the profile creation page */}
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className='dashboard'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>    
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,  // Function to fetch current profile
  deleteAccount: propTypes.func.isRequired,  // Function to delete the user account
  auth: propTypes.object.isRequired,  // Auth state, which contains the logged-in user's information
  profile: propTypes.object.isRequired  // Profile state, containing the user's profile information
}

const mapStateToProps = (state) => ({
  profile: state.profile,  // Mapping profile data from Redux state
  auth: state.auth  // Mapping authentication data from Redux state
});

// Connecting the component to Redux
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
