import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import propTypes from 'prop-types';  
import Spinner from '../common/Spinner';  
import DentistItem from './DentistItem';  
import { getDentists } from '../../actions/dentistActions';  

// Class-based component definition for Dentists
class Dentists extends Component {

  // Lifecycle method called when the component mounts to the DOM
  componentDidMount() {
    // Dispatches the getDentists action to fetch the list of dentists from the backend
    this.props.getDentists();
  }

  // Method to render the component's UI
  render() {
    // Log environment variables for debugging (like environment type and API URL)
    console.log(process.env.NODE_ENV);
    console.log(process.env.REACT_APP_API_URL);

    // Destructure dentists and loading state from Redux props
    const { dentists, loading } = this.props.dentist;
    
    let dentistItems;  // Declare a variable to hold the dentist items or the loading spinner

    // Check if dentists data is either null or still loading
    if (dentists === null || loading) {
      dentistItems = <Spinner />;  // If true, show the Spinner component while loading
    } else {
      // If dentists data is available and not empty
      if (dentists.length > 0) {
        // Map over the dentists array and render DentistItem for each dentist
        dentistItems = dentists.map(dentist => (
          <DentistItem key={dentist._id} dentist={dentist} />
        ));
      } else {
        // If no dentists found, show a message indicating no dentists
        dentistItems = <h4>No Dentists found...</h4>;
      }
    }

    // Render the JSX for the component
    return (
      <div className="dentists">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Main heading for the Dentists page */}
              <h1 className="display-4 text-center">Dentists</h1>
              {/* Subheading or description of the page */}
              <p className="lead text-center">
                Browse Dentists
              </p>
              {/* Render the list of dentist items or loading state */}
              {dentistItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Prop validation for the component props
Dentists.propTypes = {
  // getDentists should be a function and is required to fetch the dentists data
  getDentists: propTypes.func.isRequired,
  // dentist should be an object containing the dentist data (either list or loading state)
  dentist: propTypes.object.isRequired
}

// mapStateToProps function to map the Redux state to component props
const mapStateToProps = (state) => ({
  // Maps the dentist state slice to the component's props
  dentist: state.dentist
});

// Connect the component to Redux and bind the getDentists action to the component's props
export default connect(mapStateToProps, { getDentists })(Dentists);

