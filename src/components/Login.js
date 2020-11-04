import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { initiateLogin } from '../actions/auth';
import { resetErrors } from '../actions/errors';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
      email: '',
      password: '',
      errorMsg: ''
    };

    componentDidUpdate(prevProps) {
      if (!_.isEqual(prevProps.errors, this.props.errors)) { //we check if prev props not equal to current props by using lodash isEqual method 
        this.setState({ errorMsg: this.props.errors });//and only then set error in the errorMsg state. This is necessary to avoid the infinite loop error.
      }
    }
  
    componentWillUnmount() {
      this.props.dispatch(resetErrors());
    }
  
    handleLogin = (event) => {
      event.preventDefault();
      const { email, password } = this.state;
      const fieldsToValidate = [{ email }, { password }];
  
      const allFieldsEntered = validateFields(fieldsToValidate);
      if (!allFieldsEntered) {
        this.setState({
          errorMsg: {
            signin_error: 'Please enter all the fields.'
          }
        });
      } else {
        this.setState({
          errorMsg: {
            signin_error: ''
          }
        }); 
        // login successful
        this.props.dispatch(initiateLogin(email, password));
      }
    };
  
    handleInputChange = (event) => {
      const { name, value } = event.target;
  
      this.setState({
        [name]: value
      });
    };
  
    render() {
      const { errorMsg } = this.state;
      return (
        <div className="login-page">
          <h1>Banking Application</h1>
          <div className="login-form">
            <Form onSubmit={this.handleLogin}>
              {errorMsg && errorMsg.signin_error && (
                <p className="errorMsg centered-message">
                  {errorMsg.signin_error}
                </p>
              )}
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <div className="action-items">
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Link to="/register" className="btn btn-secondary">
                  Create account
                </Link>
              </div>
            </Form>
          </div>
        </div>
      );
    }
  }
//when there is an error added in the redux store, we will get an error in props.errors
//we take that updated prop value by implementing the componentDidUpdate method
  const mapStateToProps = (state) => ({
    errors: state.errors
  });
  
  export default connect(mapStateToProps)(Login);