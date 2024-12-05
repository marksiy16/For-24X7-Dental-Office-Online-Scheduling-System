import React, { Component } from 'react';                             
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import jwt_decode from 'jwt-decode';                                    
import setAuthToken from './utils/setAuthToken';                         
import { logoutUser, setCurrentUser } from './actions/authActions';      
import { clearCurrentProfile } from './actions/profileActions';         

import { Provider } from 'react-redux';                                 
import store from './store';                                             

import PrivateRoute from './components/common/PrivateRoute';            

// Importing components for different routes
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import AddAppointment from './components/appointment/AddAppointment';
import EditAppointment from './components/appointment/EditAppointment';
import Dentists from './components/dentists/Dentists';
import './App.css';  // Importing the CSS file for the app's styles

// Check if there is a JWT token in localStorage
if(localStorage.jwtToken) {
  // If the token exists, set the authorization header to include the JWT token
  setAuthToken(localStorage.jwtToken);

  // Decode the token to get the user data (e.g., user ID, username, expiration date)
  const decode = jwt_decode(localStorage.jwtToken);

  // Dispatch the action to set the current user (add the user data to the Redux state)
  store.dispatch(setCurrentUser(decode));

  // Check if the token is expired by comparing the expiration time to the current time
  const currentTime = Date.now() / 1000;  // Get current time in seconds
  if(decode.exp < currentTime) {
    // If the token is expired, log the user out
    store.dispatch(logoutUser());
    // Clear the user's current profile
    store.dispatch(clearCurrentProfile());
    // Redirect the user to the login page
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      // Wrapping the entire app with the Provider to give access to the Redux store
      <Provider store={ store }>  
        {/* Setting up the Router to handle navigation in the app */}
        <Router>
          <div className="App"> 
            <Navbar />  {/* The Navbar component is rendered on every page */}

            {/* Setting up the Routes for different paths */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />           {/* Landing page */}
              <Route path="/register" element={<Register />} />  {/* Registration page */}
              <Route path="/login" element={<Login />} />        {/* Login page */}
              <Route path="/dentists" element={<Dentists />} />  {/* Dentists page */}

              {/* Protected Routes (only accessible if the user is logged in) */}
              <Route path="/view-profile" element={<Profile />} /> {/* View user profile */}
              
              {/* PrivateRoute is used to wrap routes that require authentication */}
              <Route path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />  {/* Dashboard page, accessible only if the user is authenticated */}
              
              <Route path="/create-profile"
                element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                }
              />  {/* Create Profile page, accessible only if the user is authenticated */}
              
              <Route path="/edit-profile"
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                }
              />  {/* Edit Profile page, accessible only if the user is authenticated */}
              
              <Route path="/add-appointment"
                element={
                  <PrivateRoute>
                    <AddAppointment />
                  </PrivateRoute>
                }
              />  {/* Add Appointment page, accessible only if the user is authenticated */}
              
              <Route path="/edit-appointment/:id"
                element={
                  <PrivateRoute>
                    <EditAppointment />
                  </PrivateRoute>
                }
              />  {/* Edit Appointment page, accessible only if the user is authenticated */}
              
              <Route path="/not-found" element={<NotFound />} />  {/* Page Not Found (404) */}
            </Routes>

            <Footer />  {/* Footer component is rendered at the bottom of the page */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

