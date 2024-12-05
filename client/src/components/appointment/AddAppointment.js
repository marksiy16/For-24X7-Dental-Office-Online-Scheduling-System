import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../../withRouter';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addAppointment } from '../../actions/profileActions';
import ChooseDentist from '../modal/ChooseDentist';
import ChooseAppointmentDate from '../modal/ChooseAppointmentDate';
import ChooseAppointmentTime from '../modal/ChooseAppointmentTime';
import moment from 'moment';

class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', // The title of the appointment
      from: '', // Start time of the appointment
      to: '', // End time of the appointment
      dentist: '', // The selected dentist ID
      dentistname: '', // The selected dentist's name
      dentistschedules: '', // The available schedules for the selected dentist
      appointmentdate: '', // The formatted date and time for the appointment
      showDentists: false, // Controls visibility of the dentist selection modal
      showAppointmentDate: false, // Controls visibility of the appointment date modal
      showAppointmentTime: false, // Controls visibility of the appointment time modal
      initialDate: '', // The initial selected date for the appointment
      errors: {} // To store validation errors
    };

    // Binding functions to `this` to use them inside the component
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  /**
   * Lifecycle method that gets called when the component receives new props.
   * It checks if there are any errors passed via props and updates the local state.
   * @param {Object} nextProps - The next props passed to the component.
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  /**
   * Handles the form submission when the user books an appointment.
   * It prevents the default form submission and collects the data from the component's state
   * to submit it using the `addAppointment` action.
   * @param {Object} e - The form submit event.
   */
  onSubmit(e) {
    e.preventDefault();

    // Collect the appointment data from state
    const appointmentData = {
      title: this.state.title,
      from: this.state.from,
      to: this.state.to,
      dentist: this.state.dentist,
    };

    // Dispatch the add appointment action with the collected data
    this.props.addAppointment(appointmentData, this.props.router.navigate);
  }

  /**
   * Updates the state when an input field value changes.
   * @param {Object} e - The change event.
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Toggles the "current" state, which might be used for determining if the appointment is for an existing patient.
   * @param {Object} e - The change event.
   */
  onCheck(e) {
    this.setState({
      current: !this.state.current
    });
  }

  /**
   * Opens the dentist selection modal.
   * Sets the state to show the dentist modal and hides other modals.
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
   * Opens the appointment date selection modal.
   * Sets the state to show the appointment date modal and hides other modals.
   */
  handleShowAppointmentDate = () => {
    this.setState({
        showAppointmentDate: true, 
        showAppointmentTime: false
    });
  };

  /**
   * Closes the appointment date modal and updates the state with the selected date.
   * @param {Boolean} openAppointmentTime - Indicates if the time selection modal should open next.
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
   * Closes the appointment time modal and updates the state with the selected time range.
   * It formats the chosen date and time range.
   * @param {String} dateFrom - The start date and time of the appointment.
   * @param {String} dateTo - The end date and time of the appointment.
   */
  handleCloseAppointmentTime = (dateFrom, dateTo) => {
    const chosenDate = (dateFrom !== '' && dateTo !== '') ?
      (moment(dateFrom).format('MMMM D, YYYY') + ' ' +
       moment(dateFrom).format('h:mma') + '-' + 
       moment(dateTo).format('h:mma')) : this.state.appointmentdate;
    const chosenDateFrom = dateFrom !== '' ? dateFrom : this.state.from;
    const chosenDateTo = dateTo !== '' ? dateTo : this.state.to;

    this.setState({
        showAppointmentDate: false, 
        showAppointmentTime: false,
        from: chosenDateFrom,
        to: chosenDateTo,
        appointmentdate: chosenDate
    });
  };

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
              <h1 className="display-4 text-center">Book Appointment</h1>
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
                <ChooseDentist show={this.state.showDentists} handleClose={this.handleCloseDentists} />
                <ChooseAppointmentDate show={this.state.showAppointmentDate} schedules={this.state.dentistschedules} handleClose={this.handleCloseAppointmentDate} />
                <ChooseAppointmentTime show={this.state.showAppointmentTime} initialDate={this.state.initialDate} title={this.state.title} handleClose={this.handleCloseAppointmentTime} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddAppointment.propTypes = {
  addAppointment: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addAppointment })(withRouter(AddAppointment));
