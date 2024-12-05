import React, { Component } from 'react';  
import { withRouter } from '../../withRouter';  
import { connect } from 'react-redux';  
import propTypes from 'prop-types';  
import FullCalendar from '@fullcalendar/react';  
import timeGridPlugin from '@fullcalendar/timegrid';  
import interactionPlugin from "@fullcalendar/interaction";  
import Button from 'react-bootstrap/Button';  
import Modal from 'react-bootstrap/Modal';  

// Class-based component for selecting an appointment time
class ChooseAppointmentTime extends Component {
  constructor(props) {
    super(props);

    // Create a reference to the FullCalendar component to interact with it
    this.calendarRef = React.createRef();
  }

  // Handle time click event when a time slot is clicked on the calendar
  handleTimeClick = (arg) => {
    // For now, alerting the clicked time slot
    // alert(arg.dateStr)
  }

  // Close the modal and return selected time range (from and to)
  handleModalClose = (confirm = false) => {
    let from = '';
    let to = '';
    if (confirm) {
        if (this.calendarRef.current) {
            const calendarApi = this.calendarRef.current.getApi();  // Get the FullCalendar API
            const currentEvents = calendarApi.getEvents();  // Get all events (appointments) in the calendar

            if (currentEvents.length > 0) {
                const event = currentEvents[0];  // Assuming only one event (time slot) is selected
                from = event.start;  // Start time of the selected event
                to = event.end;  // End time of the selected event
            }
        }
    }

    this.props.handleClose(from, to);  // Pass selected time range to the parent component through handleClose
  };

  render() {
    // Initial time setup for the calendar event
    const initialTime = {
        title: this.props.title,  // The title of the event (appointment)
        start: this.props.initialDate + 'T00:00:00',  // Start time of the event
        end: this.props.initialDate + 'T00:30:00',  // End time of the event
    }

    return (
        <Modal show={this.props.show} onHide={this.handleModalClose}>  {/* Modal for time selection */}
        <Modal.Header>
            <Modal.Title>Choose Time</Modal.Title>  {/* Modal header with title */}
        </Modal.Header>
        <Modal.Body>
            {/* FullCalendar component for displaying a time grid calendar */}
            <FullCalendar
                ref={this.calendarRef}  // Reference to the FullCalendar instance
                plugins={[ timeGridPlugin, interactionPlugin ]}  // Plugins to show time grid and enable interaction
                initialView="timeGridDay"  // Default view: time grid for the day
                initialDate={this.props.initialDate}  // Initial date to display on the calendar
                headerToolbar={{
                    left: '',  // No buttons on the left
                    center: 'title',  // Display the title (current date) in the center
                    right: '',  // No buttons on the right
                }}
                allDaySlot={false}  // Do not show all-day events slot
                editable={true}  // Make the calendar editable (click and drag events)
                dateClick={this.handleTimeClick}  // Event handler for when a date or time is clicked
                events={[  // Event data to display on the calendar
                    initialTime  // The initial appointment time for the selected date
                ]}
                scrollTime="00:00:00"  // Start the calendar scroll at midnight
            />
        </Modal.Body>
        <Modal.Footer>
            {/* Buttons to close the modal or confirm the time selection */}
            <Button variant="secondary" onClick={() => this.handleModalClose()}>
                Close  {/* Close button to close the modal */}
            </Button>
            <Button variant="info" onClick={this.handleModalClose}>
                Confirm  {/* Confirm button to finalize the selection */}
            </Button>
        </Modal.Footer>
        </Modal>
    )
  }
}

// PropTypes validation for the props passed into the component
ChooseAppointmentTime.propTypes = {
  profile: propTypes.object.isRequired,  // Profile object to be passed from the parent component
  errors: propTypes.object.isRequired,  // Errors object for error handling
}

// Map the Redux state to the component's props
const mapStateToProps = (state) => ({
  profile: state.profile,  // Get the profile data from Redux store
  errors: state.errors  // Get the errors data from Redux store
});

// Connect the component to Redux store and wrap it with withRouter to access routing props
export default connect(mapStateToProps)(withRouter(ChooseAppointmentTime));
