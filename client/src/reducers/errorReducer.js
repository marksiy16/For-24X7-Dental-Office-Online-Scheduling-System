import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

// Initial state of the reducer
const initialState = {};

// Reducer function to handle error-related actions
export default function(state = initialState, action) { 
  switch (action.type) {
    // Case for GET_ERRORS: Updates the state with error data
    case GET_ERRORS:
      return action.payload;
    
    // Case for CLEAR_ERRORS: Resets the error state to an empty object
    case CLEAR_ERRORS:
      return {};
      
    // Default case: Returns the current state if the action type doesn't match
    default:
      return state;
  }
}
