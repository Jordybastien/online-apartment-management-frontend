import React, { Component } from 'react';
import Logo from '../assets/logo.png';
import TextBox from '../components/textBox';
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleUserLogin } from '../actions/authedUser';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginView extends Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
    errorMessage: '',
    loading: false,
  };

  handleEmail = (e) => {
    const { errors } = this.state;
    errors.email = '';
    this.setState({ errors, email: e.target.value, errorMessage: '' });
  };

  handlePassword = (e) => {
    const { errors } = this.state;
    errors.password = '';
    this.setState({ errors, password: e.target.value, errorMessage: '' });
  };

  checkValidation = () => {
    const { email, password, errors } = this.state;

    let response = true;

    const data = { email, password };

    if (!email) {
      errors.email = 'Email is required';
      response = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
      response = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      response = false;
    } else if (password.length < 6) {
      errors.password = 'Password can not be less than 6 digits';
      response = false;
    }

    this.setState({ errors });

    return { data, response };
  };

  handleSubmit = () => {
    const { data, response } = this.checkValidation();
    if (response) {
      this.setState({ loading: true, errorMessage: '' });

      this.props.dispatch(handleUserLogin(data)).then((res) => {
        this.setState({ loading: false });

        if (res.type !== 'LOG_ERROR') this.props.history.push('/');
        else this.setState({ errorMessage: res.error });
      });
    }
  };

  render() {
    const { email, password, errors, errorMessage, loading } = this.state;
    const { isAuth } = this.props;

    if (isAuth) return <Redirect to="/" />;
    return (
      <div className="overall-wrapper">
        <div className="container">
          <div className="col-md-5 mx-auto py-3">
            <div className="card-box">
              <div className="card-heading">
                <h5 className="text-center font-weight-bold login-label">
                  Apartment Management System
                </h5>
                <p className="text-center login-secondary-text">
                  Please sign in to continue
                </p>
              </div>
              <div className="mx-auto">
                <img src={Logo} alt="logo" width="100px" />
              </div>
              <div className="login-form">
                <h5 className="text-center">Login</h5>
                {errorMessage && (
                  <div className="error-message-container">
                    <div className="d-flex">
                      <div>
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          size="1x"
                          color="#485056"
                          className="error-icon"
                        />
                      </div>
                      <div>
                        <span className="error-title">Error</span>
                      </div>
                    </div>
                    <div>
                      <span className="error-label">{errorMessage}</span>
                    </div>
                  </div>
                )}
                <TextBox
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={this.handleEmail}
                  errorMessage={errors.email}
                />
                <TextBox
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={this.handlePassword}
                  errorMessage={errors.password}
                />
                <button
                  className="btn btn-primary btn-block custom-btn"
                  disabled={email && password === ''}
                  onClick={this.handleSubmit}
                >
                  {loading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      size="2x"
                      color="#fff"
                      className="ml-2"
                    />
                  ) : (
                    'Login'
                  )}
                </button>
                <div className="text-center">
                  <span className="d-block border-top signup-label">
                    Don't have an account?{' '}
                    <Link to="/signup" className="signup-link">
                      Signup
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return { isAuth: Object.keys(authedUser).length !== 0 };
};

export default connect(mapStateToProps)(LoginView);
