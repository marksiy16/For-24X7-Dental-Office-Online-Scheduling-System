import React, { Component } from 'react';  
import { withRouter } from '../../withRouter';  
import { connect } from 'react-redux';  
import propTypes from 'prop-types';  
import Modal from 'react-bootstrap/Modal';  
import { getDentists } from '../../actions/dentistActions';  

// Class-based component for selecting a dentist
class ChooseDentist extends Component {
  constructor(props) {
    super(props);
  }

  // Fetch the list of dentists when the component is mounted
  componentDidMount() {
    this.props.getDentists();  // Fetch dentists from the Redux store using the action creator
  }

  // Event handler when a user selects a dentist
  onSelectClick(id, name, schedules) {    
    // Pass selected dentist details (id, name, schedules) to parent component via handleModalClose
    this.handleModalClose(id, name, schedules);
  }

  // Close the modal and return selected dentist details (id, name, schedules) to parent component
  handleModalClose = (dentistId, dentistName, dentistSchedules) => {
    this.props.handleClose(dentistId, dentistName, dentistSchedules);  // Pass details to parent
  };

  render() {
    const { dentists } = this.props.dentist;  // Access the list of dentists from the Redux store
    let dentistsElem;

    // If dentists data is available, render a table of dentists
    if (dentists !== null) {
        dentistsElem = dentists.map(item => 
            <tr key={item._id}>
                <td>{item.name}</td>  {/* Dentist name */}
                <td>{item.specialization}</td>  {/* Dentist specialization */}
                <td>{item.schedules}</td>  {/* Dentist schedules */}
                <td>
                <button onClick={this.onSelectClick.bind(this, item._id, item.name, item.schedules)} className="btn btn-secondary">
                    Select  {/* Button to select the dentist */}
                </button>
                </td>
            </tr>
        );
    }

    return (
        <Modal show={this.props.show} onHide={() => this.handleModalClose('', '', '')} size="lg">
        <Modal.Header>
            <Modal.Title>Choose Dentist</Modal.Title>  {/* Modal header with title */}
        </Modal.Header>
        <Modal.Body>
        <div>
            {/* Table displaying the list of dentists */}
            <table className="table">
            <thead>
                <tr>
                <th>Dentist</th>
                <th>Specialization</th>
                <th>Schedules</th>
                <th></th>  {/* Empty column for the select button */}
                </tr>            
            </thead>
            <tbody>
                {dentistsElem}  {/* Display each dentist as a table row */}
            </tbody>
            </table>
        </div>
        </Modal.Body>
        </Modal>
    )
  }
}

// PropTypes validation for the props passed into the component
ChooseDentist.propTypes = {
  dentist: propTypes.object.isRequired,  // Dentist data from Redux store
  errors: propTypes.object.isRequired,  // Errors data for error handling
  getDentists: propTypes.func.isRequired,  // Action to fetch dentists from Redux
}

// Map the Redux state to the component's props
const mapStateToProps = (state) => ({
  dentist: state.dentist,  // Get the dentists data from the Redux store
  errors: state.errors  // Get the errors data from the Redux store
});

// Connect the component to Redux store and wrap it with withRouter to access routing props
export default connect(mapStateToProps, { getDentists })(withRouter(ChooseDentist));
