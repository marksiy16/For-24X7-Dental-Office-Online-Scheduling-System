import React from 'react';  
import { Link } from 'react-router-dom';  

// Functional component ProfileActions
const ProfileActions = () => {
  return (
    // Container div for the buttons with Bootstrap styling
    <div className="btn-group mb-4" role="group">
      {/* Button to navigate to the edit profile page */}
      <Link to="/edit-profile" className="btn btn-light">
        {/* Font Awesome icon for user-circle */}
        <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile
      </Link>
      
      {/* Button to navigate to the add appointment page */}
      <Link to="/add-appointment" className="btn btn-light">
        {/* Font Awesome icon for black-tie (a tie symbol, representing a professional) */}
        <i className="fab fa-black-tie text-info mr-1"></i> Book Appointment
      </Link>
    </div>
  );
}

// Exporting ProfileActions component as default to be used in other parts of the application
export default ProfileActions;

