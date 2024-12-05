import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Set the base URL for API requests
const apiUrl = process.env.REACT_APP_API_URL;

// Register user
export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    // Send POST request to register user
    const res = await axios.post(apiUrl + '/api/users/register', userData);
    navigate('/login'); // Navigate to login page upon successful registration
  } catch (err) {
    // Dispatch error if the registration request fails
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || {} // Handle case where response may be undefined
    });
  }
};

// Log in user
export const loginUser = (userData) => async (dispatch) => {
  try {
    // Send POST request to log in user
    const res = await axios.post(apiUrl + '/api/users/login', userData);
    
    // Save the received JWT token in localStorage
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);

    // Set the token in the Authorization header for subsequent requests
    setAuthToken(token);

    // Decode the token to extract user data
    const decode = jwt_decode(token);

    // Dispatch action to set the current user
    dispatch(setCurrentUser(decode));
  } catch (err) {
    // Dispatch error if login fails
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || {} // Handle case where response may be undefined
    });
  }
};

// Set the current user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded // Set the decoded JWT as the current user
  };
};

// Log out user
export const logoutUser = () => async (dispatch) => {
  // Remove the JWT token from localStorage
  localStorage.removeItem('jwtToken');
  
  // Remove the token from the Authorization header for future requests
  setAuthToken(false);

  // Dispatch action to reset the current user (logged out)
  dispatch(setCurrentUser({}));

  // Redirect user to login page
  window.location.href = '/login';
};

