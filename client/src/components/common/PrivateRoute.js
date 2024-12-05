import React from 'react';               
import { Route, Navigate } from 'react-router-dom';  
import { connect } from 'react-redux';   
import propTypes from 'prop-types';      

// Defining the PrivateRoute component
const PrivateRoute = ({ children, auth }) => {  
  // Check if the user is authenticated (auth.isAuthenticated)
  return auth.isAuthenticated === true ? (
    children  // If the user is authenticated, render the child components (the protected route)
  ) : (
    <Navigate to="/login" />  // If the user is not authenticated, redirect to the login page
  );
}

// Prop types validation to ensure the correct types are passed as props
PrivateRoute.propTypes = {
  auth: propTypes.object.isRequired  // 'auth' should be an object and is required
};

// mapStateToProps function to map Redux state to component props
const mapStateToProps = (state) => ({
  auth: state.auth  // Extract the 'auth' state from the Redux store and pass it as a prop to the component
});

// Export the component, connecting it to the Redux store using the 'connect' function
export default connect(mapStateToProps)(PrivateRoute);


