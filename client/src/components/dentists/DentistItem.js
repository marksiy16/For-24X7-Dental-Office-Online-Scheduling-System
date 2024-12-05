import React, { Component } from 'react';  
import PropTypes from 'prop-types';  
import isEmpty from '../../validation/is-empty';  

// Class-based component definition for DentistItem
class DentistItem extends Component {

  // Method to render the component's UI
  render() {
    // Destructuring the 'dentist' object from the component props
    const { dentist } = this.props;
    
    // JSX structure to display a dentist's information
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            {/* Display the dentist's avatar image */}
            <img src={dentist.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            {/* Display the dentist's name */}
            <h3>{dentist.name}</h3>
            <p>
              {/* Only display the specialization if it is not empty */}
              {isEmpty(dentist.specialization) ? null : (<span>{dentist.specialization}</span>)}
            </p>
          </div>
          <div className="col-md-4 d-none d-md-block">
            {/* Display the dentist's schedule if the screen size allows */}
            <h4>Schedule</h4>
            <ul className="list-group">
              {/* Loop through the dentist's schedule string (comma-separated) and render each schedule item */}
              {dentist.schedules.split(", ").map((schedule, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {schedule}          
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

// Prop validation for the component props
DentistItem.propTypes = {
  // 'dentist' should be an object and is required
  dentist: PropTypes.object.isRequired
}

// Exporting the component as the default export of the file
export default DentistItem;
