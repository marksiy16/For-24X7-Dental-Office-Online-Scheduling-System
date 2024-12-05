import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from '../../withRouter';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '', // The user's email address
      password: '', // The user's password
      errors: {} // Holds validation errors from the backend
    };

    // Binding methods to `this`
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }  

  /**
   * Lifecycle method that checks if the user is already authenticated.
   * If they are, redirects them to the dashboard.
   */
  componentDidMount() {        
    if (this.props.auth.isAuthenticated) {
      window.location.href = '/dashboard'; // Redirect if already authenticated
    }
  }

  /**
   * Lifecycle method that gets called when the props change.
   * If the user is authenticated, it redirects to the dashboard.
   * If there are validation errors, they are set in the state.
   * @param {Object} nextProps - The next props received by the component.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.router.navigate('/dashboard'); // Redirect to dashboard on successful login
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors }); // Set any validation errors
    }
  }

  /**
   * Handles form input changes and updates the state.
   * @param {Object} e - The change event.
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Handles form submission by preventing the default behavior and dispatching the login action.
   * @param {Object} e - The form submit event.
   */
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    // Dispatching the login action with user credentials
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your Pet Lovers Society account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email} // Display error for the email field
                />
                <TextFieldGroup 
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password} // Display error for the password field
                />                                  
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: propTypes.func.isRequired, // The action to handle login
  auth: propTypes.object.isRequired, // The authentication state from Redux
  errors: propTypes.object.isRequired // The error state from Redux
}

const mapStateToProps = (state) => ({
  auth: state.auth, // Mapping the authentication state to props
  errors: state.errors // Mapping the errors state to props
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));

