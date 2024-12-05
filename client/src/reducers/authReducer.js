import isEmpty from '../validation/is-empty';  // Importing the 'isEmpty' utility function to check if values are empty
import { TEST_DISPATCH, SET_CURRENT_USER } from "../actions/types";  // Importing action types

// Initial state of the reducer
const initialState = {
  isAuthenticated: false,  // Boolean flag to track if the user is authenticated
  user: {}  // The user object will store information about the logged-in user
}

// Reducer function that handles authentication-related actions
export default function(state = initialState, action) { 
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload  // Updates the user information when TEST_DISPATCH is dispatched
      };
    case SET_CURRENT_USER:      
      return {
        ...state,
        // Sets 'isAuthenticated' based on whether action.payload is empty or not
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload  // Sets the user information when SET_CURRENT_USER is dispatched
      };
    default:
      return state;  // Returns the current state if the action type is unrecognized
  }
}
