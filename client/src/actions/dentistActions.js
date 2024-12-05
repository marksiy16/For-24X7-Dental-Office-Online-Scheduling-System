import axios from 'axios';
import { DENTIST_LOADING, GET_DENTISTS, CLEAR_CURRENT_DENTIST } from './types';

// Base API URL
const apiUrl = process.env.REACT_APP_API_URL;

// Get all dentists
export const getDentists = () => async (dispatch) => {
  // Set loading state while fetching data
  dispatch(setDentistLoading());

  try {
    // Make GET request to fetch all dentists
    const res = await axios.get(apiUrl + '/api/dentists');
    
    // Dispatch action to store the fetched data
    dispatch({
      type: GET_DENTISTS,
      payload: res.data, // Pass fetched data to reducer
    });
  } catch (err) {
    // If an error occurs, dispatch null data
    dispatch({
      type: GET_DENTISTS,
      payload: null, // Default null data on error
    });
  }
};

// Set dentist loading state
export const setDentistLoading = () => {
  return {
    type: DENTIST_LOADING // Dispatches action to indicate loading state
  };
};

// Clear current dentist
export const clearCurrentDentist = () => {
  return {
    type: CLEAR_CURRENT_DENTIST // Dispatch action to clear current dentist data
  };
};
