import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import moment from 'moment';
import { deleteAppointment } from '../../actions/profileActions';

class Appointments extends Component {
  // Handler for deleting an appointment
  onDeleteClick(id) {    
    this.props.deleteAppointment(id);  // Dispatches action to delete appointment
  }

  // Helper function to format appointment dates
  formatAppointmentDate(appointment) {
    const appointmentDate = 
      (moment(appointment.from).format('MMMM D, YYYY') + ' ' +
       moment(appointment.from).format('h:mma') + '-' + 
       moment(appointment.to).format('h:mma'));
    return appointmentDate;
  }

  // Render method
  render() {
    // Maps over the appointments array and renders each appointment as a table row
    const appointments = this.props.appointments.map(appointment => (
      <tr key={appointment._id}>
        <td>{appointment.title}</td>  {/* Appointment Title */}
        <td>{appointment.dentist.name}</td>  {/* Dentist's Name */}
        <td>{this.formatAppointmentDate(appointment)}</td>  {/* Formatted Date */}
        <td>
          {/* Link to edit appointment */}
          <Link to={"/edit-appointment/"+appointment._id} className="btn btn-info">
            Reschedule
          </Link>
        </td>
        <td>
          {/* Button to delete appointment */}
          <button onClick={this.onDeleteClick.bind(this, appointment._id)} className="btn btn-secondary">
            Cancel
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">My Appointments</h4>
        {/* Table displaying all appointments */}
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Dentist</th>
              <th>Date</th>
              <th width="10px"></th> 
              <th width="10px"></th>             
            </tr>            
          </thead>
          <tbody>
            {appointments}  {/* Renders the list of appointments */}
          </tbody>
        </table>
      </div>
    );
  }
}

Appointments.propTypes = {
  appointments: propTypes.array.isRequired,  // List of appointments passed as prop
  deleteAppointment: propTypes.func.isRequired  // Function to delete an appointment
}

// Mapping Redux state to component props (empty here as the appointments list is assumed to be in the props directly)
export default connect(null, { deleteAppointment })(Appointments);
