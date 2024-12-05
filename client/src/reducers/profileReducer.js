import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES } from "../actions/types";

const initialState = {
  profile: null,      // Holds the current profile data (single profile)
  profiles: null,     // Holds the list of profiles
  loading: false      // Indicates whether data is being loaded
};

export default function(state = initialState, action){ 
  switch(action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true  // Set loading state to true when profile data is being loaded
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,  // Set profile data when it's retrieved
        loading: false            // Set loading to false once data is fetched
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload, // Set the list of profiles when retrieved
        loading: false            // Set loading to false after profiles are fetched
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,  // Clear the current profile when the action is dispatched
      };
    default:
      return state;  // Return the current state if no relevant action type is matched
  }
}
