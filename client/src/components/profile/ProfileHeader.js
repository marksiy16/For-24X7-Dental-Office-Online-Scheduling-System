import React, { Component } from 'react';  
import isEmpty from '../../validation/is-empty';  

// ProfileHeader component to display user profile information
class ProfileHeader extends Component {

  render() {
    const { profile } = this.props;  // Destructure the 'profile' prop passed to the component

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={profile.user.avatar} alt="" />  {/* Profile avatar image */}
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>  {/* User name */}
              {isEmpty(profile.contactnumber) ? null : (<p>{profile.contactnumber}</p>)}  {/* Display contact number if available */}
              {isEmpty(profile.user.email) ? null : (<p>{profile.user.email}</p>)}  {/* Display email if available */}
              {isEmpty(profile.address) ? null : (<p>{profile.address}</p>)}  {/* Display address if available */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
