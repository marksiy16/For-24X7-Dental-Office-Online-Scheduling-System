import { GET_DENTIST, DENTIST_LOADING, CLEAR_CURRENT_DENTIST, GET_DENTISTS } from "../actions/types";

// Initial state of the reducer
const initialState = {
  dentist: null,  // Represents a single dentist's data
  dentists: null, // Represents an array of dentists' data
  loading: false  // Represents the loading state when fetching data
}

// Reducer function that handles dentist-related actions
export default function(state = initialState, action) { 
  switch(action.type) {
    case DENTIST_LOADING:
      return {
        ...state,
        loading: true  // Set loading to true when data is being fetched
      };
    case GET_DENTIST:
      return {
        ...state,
        dentist: action.payload,  // Sets the single dentist data from the action payload
        loading: false  // Set loading to false once data is fetched
      };
    case GET_DENTISTS:
      return {
        ...state,
        dentists: action.payload,  // Sets the list of dentists data from the action payload
        loading: false  // Set loading to false once data is fetched
      };
    case CLEAR_CURRENT_DENTIST:
      return {
        ...state,
        dentist: null  // Clears the single dentist data when this action is dispatched
      };
    default:
      return state;  // Returns the current state if the action type is unrecognized
  }
}
