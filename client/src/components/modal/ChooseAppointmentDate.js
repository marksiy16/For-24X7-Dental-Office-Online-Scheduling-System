import React, { Component } from 'react';  
import { withRouter } from '../../withRouter';  
import { connect } from 'react-redux';  
import propTypes from 'prop-types';  
import FullCalendar from '@fullcalendar/react';  
import dayGridPlugin from '@fullcalendar/daygrid';  
import interactionPlugin from "@fullcalendar/interaction";  
import Button from 'react-bootstrap/Button';  
import Modal from 'react-bootstrap/Modal';  

// Class-based component for choosing an appointment date
class ChooseAppointmentDate extends Component {
  constructor(props) {
    super(props);
  }

  // Handler function for when a date on the calendar is clicked
  handleDateClick = (arg) => {
    const dayOfWeek = arg.date.getDay();  // Get the day of the week (0: Sunday, 1: Monday, etc.)
    if(this.hasSchedule(dayOfWeek)) {  // Check if there is a schedule for this day of the week
        this.handleModalClose(true, arg.dateStr);  // If there's a schedule, close the modal and pass the selected date
    } 
  }

  // Closes the modal and passes the selected date to the parent component
  handleModalClose = (openAppointmentTime, initialDate) => {
    this.props.handleClose(openAppointmentTime, initialDate);  // Pass data to the parent using handleClose
  };

  // Checks if the given day of the week has a schedule
  hasSchedule = (dayOfWeek) => {
    const schedules = this.props.schedules !== undefined ? this.props.schedules.split(", ") : [];  // Parse schedules from props
    const days = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }
    let hasSchedule = false;
    schedules.map(day => {
        if(day === days[dayOfWeek]) {  // If the day in the schedule matches the clicked day
            hasSchedule = true;  // There is a schedule for this day
        }
    });
    return hasSchedule;  // Return whether this day has a schedule
  }

  render() {
    return (
        // Modal component that will show the calendar
        <Modal show={this.props.show} onHide={() => this.handleModalClose(false, '')} size="lg">
            <Modal.Header>
                <Modal.Title>Choose Date</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* FullCalendar component to display the calendar */}
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}  // Load necessary plugins for calendar and interaction
                    initialView="dayGridMonth"  // Display the month view by default
                    dateClick={this.handleDateClick}  // Handle date clicks using the method defined above
                    fixedWeekCount={false}  // Allow the calendar to adjust based on the month length
                    // Apply custom class to day cells based on whether there is a schedule for that day
                    dayCellClassNames={(arg) => {
                        const dayOfWeek = arg.date.getDay();  // Get the day of the week for the clicked cell
                        if(!this.hasSchedule(dayOfWeek)) {  // If no schedule for that day, disable the cell
                            return 'fc-disabled';  // Add a class to disable the day cell
                        }
                        return '';  // Otherwise, keep the day cell enabled
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                {/* Button to close the modal */}
                <Button variant="secondary" onClick={() => this.handleModalClose(false, '')}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
  }
}

// Prop types for validation
ChooseAppointmentDate.propTypes = {
  profile: propTypes.object.isRequired,  // profile object passed from the parent component
  errors: propTypes.object.isRequired,  // errors object, potentially for form validation or error handling
}

// mapStateToProps to map Redux state to the component's props
const mapStateToProps = (state) => ({
  profile: state.profile,  // Get the profile data from the Redux store
  errors: state.errors  // Get any error data from the Redux store
});

// Connect the component to Redux and wrap it with withRouter to access routing functionality
export default connect(mapStateToProps)(withRouter(ChooseAppointmentDate));
