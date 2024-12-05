import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import dentistReducer from './dentistReducer';

// Combine the individual reducers into a single root reducer
export default combineReducers({
  auth: authReducer,         // Manages authentication-related state
  errors: errorReducer,      // Manages error messages and state
  profile: profileReducer,   // Manages user profile-related state
  dentist: dentistReducer    // Manages dentist-related state
});
