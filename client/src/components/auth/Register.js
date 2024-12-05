import React, { Component } from 'react';
import propTypes from 'prop-types'; 
import { withRouter } from '../../withRouter';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '', // The user's name
      email: '', // The user's email address
      password: '', // The user's password
      password2: '', // Confirmation of the user's password
      errors: {} // Holds validation errors from the backend
    }

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
   * If there are any errors in the incoming props, they are set in the state.
   * @param {Object} nextProps - The next props received by the component.
   */
  componentWillReceiveProps(nextProps) {
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
   * Handles form submission by preventing the default behavior and dispatching the registration action.
   * @param {Object} e - The form submit event.
   */
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    
    // Dispatching the registerUser action with the new user data
    this.props.registerUser(newUser, this.props.router.navigate);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Pet Lovers Society account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name} // Display error for the name field
                />
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
                <TextFieldGroup 
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2} // Display error for the confirm password field
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

Register.propTypes = {
  registerUser: propTypes.func.isRequired, // The action to handle user registration
  auth: propTypes.object.isRequired, // The authentication state from Redux
  errors: propTypes.object.isRequired // The error state from Redux
}

const mapStateToProps = (state) => ({
  auth: state.auth, // Mapping the authentication state to props
  errors: state.errors // Mapping the errors state to props
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
