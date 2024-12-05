import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES } from './types';

// Base API URL
const apiUrl = process.env.REACT_APP_API_URL;

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch(setProfileLoading());

  try {
    // Fetch current profile data
    const res = await axios.get(apiUrl + '/api/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data, // Store profile data in Redux store
    });
  } catch (err) {
    // In case of error, dispatch an empty object
    dispatch({
      type: GET_PROFILE,
      payload: {},
    });
  }
};

// Create a new profile
export const createProfile = (profileData, navigate) => async (dispatch) => {
  try {
    // Send POST request to create a profile
    await axios.post(apiUrl + '/api/profile', profileData);
    setTimeout(() => navigate('/dashboard'), 500); // Redirect after successful profile creation
  } catch (err) {
    // Dispatch errors if creation fails
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || {}, // Fallback to empty object if response is undefined
    });
  }
};

// Update an existing profile
export const updateProfile = (profileId, profileData, navigate) => async (dispatch) => {
  try {
    // Send PUT request to update profile
    await axios.put(apiUrl + '/api/profile/'+profileId, profileData);
    setTimeout(() => navigate('/dashboard'), 500); // Redirect after successful update
  } catch (err) {
    // Dispatch errors if update fails
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || {},
    });
  }
};

// Add new appointment
export const addAppointment = (appointmentData, navigate) => async (dispatch) => {
  try {
    // Send POST request to add an appointment
    await axios.post(apiUrl + '/api/profile/appointment', appointmentData);
    setTimeout(() => navigate('/dashboard'), 500); // Redirect after success
  } catch (err) {
    // Dispatch errors if adding appointment fails
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || {},
    });
  }
};

// Edit existing appointment
export const editAppointment = (appointmentId, appointmentData, navigate) => async (dispatch) => {
  try {
    // Send PUT request to edit appointment
    await axios.put(apiUrl + '/api/profile/appointment/'+appointmentId, appointmentData);
    setTimeout(() => navigate('/dashboard'), 500);
  } catch (err) {
    // Dispatch errors if editing fails
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || {},
    });
  }
};

// Delete appointment
export const deleteAppointment = (id) => async (dispatch) => {
  try {
    // Send DELETE request to remove appointment
    const res = await axios.delete(apiUrl + `/api/profile/appointment/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data, // Update profile after deletion
    });
  } catch (err) {
    // Dispatch errors if deletion fails
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || {},
    });
  }
};

// Delete user account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can not be undone!')) {
    try {
      // Send DELETE request to remove profile and account
      await axios.delete(apiUrl + '/api/profile');
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}, // Reset current user after account deletion
      });
    } catch (err) {
      // Dispatch errors if deletion fails
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data || {},
      });
    }
  }
};

// Set profile loading state
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING, // Dispatches loading action
  };
};

// Clear current profile from state
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE, // Clears current profile data from Redux store
  };
};
