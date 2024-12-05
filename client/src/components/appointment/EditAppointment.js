import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../../withRouter';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { editAppointment } from '../../actions/profileActions';
import ChooseDentist from '../modal/ChooseDentist';
import ChooseAppointmentDate from '../modal/ChooseAppointmentDate';
import ChooseAppointmentTime from '../modal/ChooseAppointmentTime';
import moment from 'moment';

class EditAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '', // The appointment ID
      title: '', // The title or description of the appointment
      from: '', // Start time of the appointment
      to: '', // End time of the appointment
      dentist: '', // The selected dentist ID
      dentistname: '', // The selected dentist's name
      dentistschedules: '', // The available schedules for the selected dentist
      appointmentdate: '', // The formatted date and time for the appointment
      showDentists: false, // Controls the visibility of the dentist selection modal
      showAppointmentDate: false, // Controls the visibility of the appointment date modal
      showAppointmentTime: false, // Controls the visibility of the appointment time modal
      initialDate: '', // The initial selected date for the appointment
      errors: {} // Stores validation errors
    };

    // Binding functions to `this`
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  /**
   * Lifecycle method that gets called after the component mounts.
   * It fetches the appointment data using the appointment ID from the URL
   * and populates the component's state.
   */
  componentDidMount() {
    if (this.props.router.params.id) {
      const appointmentId = this.props.router.params.id;
      const { profile } = this.props.profile;
      const appointment = profile.appointments.find(appointment => appointment._id === appointmentId);
      const dentist = appointment.dentist;

      // Setting state with existing appointment details
      this.setState({ 
        id: appointmentId,
        title: appointment.title,
        from: appointment.from,
        to: appointment.to,
        dentist: dentist._id,
        dentistname: dentist.name,
        dentistschedules: dentist.schedules,
        appointmentdate: this.handleFormatAppointmentDate(appointment.from, appointment.to),
        initialDate: moment(appointment.from).format('YYYY-MM-DD')
      });
    }
  }

  /**
   * Lifecycle method that updates the component's state when new props are received.
   * This is typically used for updating errors when they are passed via props.
   * @param {Object} nextProps - The new props received.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  /**
   * Handles the form submission for editing the appointment.
   * It prevents the default form submission, collects the updated appointment data,
   * and dispatches the `editAppointment` action.
   * @param {Object} e - The form submit event.
   */
  onSubmit(e) {
    e.preventDefault();

    // Collecting updated appointment data from the component's state
    const appointmentData = {
      title: this.state.title,
      from: this.state.from,
      to: this.state.to,
      dentist: this.state.dentist,
    };

    // Dispatching the editAppointment action with the updated data
    this.props.editAppointment(this.state.id, appointmentData, this.props.router.navigate);
  }

  /**
   * Updates the component's state when an input field changes.
   * @param {Object} e - The change event.
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * This function updates the "current" state, which could be used for indicating if the appointment
   * is for an existing patient or a new one (though the functionality is not fully implemented here).
   * @param {Object} e - The change event.
   */
  onCheck(e) {
    this.setState({
      current: !this.state.current
    });
  }

  /**
   * Opens the dentist selection modal and hides other modals.
   */
  handleShowDentists = () => {
    this.setState({ 
      showDentists: true,
      showAppointmentDate: false,
      showAppointmentTime: false
    });
  };

  /**
   * Closes the dentist selection modal and updates the state with the selected dentist details.
   * @param {String} id - The selected dentist's ID.
   * @param {String} name - The selected dentist's name.
   * @param {Array} schedules - The available schedules for the selected dentist.
   */
  handleCloseDentists = (id, name, schedules) => {
    const chosenDentistId = id !== '' ? id : this.state.dentist;
    const chosenDentistName = name !== '' ? name : this.state.dentistname;
    const chosenDentistSchedules = schedules !== '' ? schedules : this.state.dentistschedules;

    this.setState({ 
      dentist: chosenDentistId,
      dentistname: chosenDentistName,
      dentistschedules: chosenDentistSchedules,
      showDentists: false,
      from: '',
      to: '',
      appointmentdate: ''
    });
  };

  /**
   * Opens the appointment date selection modal and hides other modals.
   */
  handleShowAppointmentDate = () => {
    this.setState({ 
      showAppointmentDate: true, 
      showAppointmentTime: false
    });
  };

  /**
   * Closes the appointment date modal and updates the state with the selected date.
   * @param {Boolean} openAppointmentTime - Indicates whether the time selection modal should open.
   * @param {String} initialDate - The selected appointment date.
   */
  handleCloseAppointmentDate = (openAppointmentTime, initialDate) => {
    this.setState({ 
      showAppointmentDate: false, 
      initialDate: initialDate,
      showAppointmentTime: openAppointmentTime,
    });
  };

  /**
   * Closes the appointment time modal and updates the state with the selected time.
   * @param {String} dateFrom - The selected start time for the appointment.
   * @param {String} dateTo - The selected end time for the appointment.
   */
  handleCloseAppointmentTime = (dateFrom, dateTo) => {
    const chosenDate = this.handleFormatAppointmentDate(dateFrom, dateTo);
    const chosenDateFrom = (dateFrom !== '' ? dateFrom : this.state.from);
    const chosenDateTo = (dateTo !== '' ? dateTo : this.state.to);

    this.setState({ 
      showAppointmentDate: false, 
      showAppointmentTime: false,
      from: chosenDateFrom,
      to: chosenDateTo,
      appointmentdate: chosenDate
    });
  };

  /**
   * Formats the appointment date and time for display.
   * @param {String} dateFrom - The start date and time.
   * @param {String} dateTo - The end date and time.
   * @returns {String} - The formatted appointment date and time.
   */
  handleFormatAppointmentDate(dateFrom, dateTo) {
    const formattedDate = (dateFrom !== '' && dateTo !== '') ? 
      (moment(dateFrom).format('MMMM D, YYYY') + ' ' + 
       moment(dateFrom).format('h:mma') + '-' + 
       moment(dateTo).format('h:mma')) : this.state.appointmentdate;

    return formattedDate;
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-appointment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Reschedule Appointment</h1>
              <small className="d-block pb-3">*= required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <div className="input-group-append text-right">
                    <button className="btn btn-secondary" type="button" onClick={this.handleShowDentists} disabled={this.state.title === ''}>Choose Dentist</button>
                </div>
                <TextFieldGroup
                  placeholder="* Dentist"
                  name="dentistname"
                  value={this.state.dentistname}
                  onChange={this.onChange}
                  error={errors.dentistname}
                  disabled={true}
                />
                <div className="input-group-append text-right">
                    <button className="btn btn-secondary" type="button" onClick={this.handleShowAppointmentDate} disabled={this.state.dentist === ''}>Choose Appointment Date</button>
                </div>
                <TextFieldGroup
                  placeholder="* Appointment Date"
                  name="appointmentdate"
                  value={this.state.appointmentdate}
                  onChange={this.onChange}
                  error={errors.appointmentdate}
                  disabled={true}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
                <ChooseDentist show={this.state.showDentists} handleClose={(id, name, schedules) => this.handleCloseDentists(id, name, schedules)} />
                <ChooseAppointmentDate show={this.state.showAppointmentDate} schedules={this.state.dentistschedules} handleClose={this.handleCloseAppointmentDate} />
                <ChooseAppointmentTime show={this.state.showAppointmentTime} initialDate={this.state.initialDate} title={this.state.title} handleClose={(from, to) => this.handleCloseAppointmentTime(from, to)} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditAppointment.propTypes = {
  editAppointment: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { editAppointment })(withRouter(EditAppointment));
