// Import necessary hooks from the "react-router-dom" library
import {
  useLocation, // For accessing the current location (URL) object
  useNavigate, // For navigating programmatically to different routes
  useParams    // For accessing route parameters from the URL
} from "react-router-dom";

// Define the higher-order component (HOC) `withRouter` that wraps a given component
export function withRouter(Component) {
  
  // This is the component that will be returned by the `withRouter` HOC
  function ComponentWithRouterProp(props) {
    
    // Using the `useLocation` hook to get the current location object (URL info)
    let location = useLocation();
    
    // Using the `useNavigate` hook to get the navigate function for navigation actions
    let navigate = useNavigate();
    
    // Using the `useParams` hook to get the route parameters from the URL
    let params = useParams();
    
    // Return the wrapped component, passing the router-related data as a prop
    return (
      <Component
        {...props} // Pass all other props along to the wrapped component
        router={{ location, navigate, params }} // Attach the router data to a `router` prop
      />
    );
  }

  // Return the enhanced component with router props
  return ComponentWithRouterProp;
}
