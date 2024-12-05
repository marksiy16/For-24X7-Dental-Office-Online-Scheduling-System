import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { withRouter } from '../../withRouter';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {    
    if(this.props.auth.isAuthenticated) {
      window.location.href = '/dashboard';
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Dental Online Scheduling
                </h1>
                <p className="lead"> The Dental Office Online Scheduling System is an easy-to-use platform that lets patients schedule, modify, and cancel appointments online, anytime and from any device. It integrates with the dental office’s calendar to show real-time availability, ensuring efficient scheduling and minimizing conflicts.</p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(withRouter(Landing));
