import React, { Component } from 'react';
import Logo from '../assets/logo.png';
import TextBox from '../components/textBox';
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleSignupUser } from '../actions/authedUser';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import { message } from 'antd';

const userTypes = [
  { value: 'client', label: 'Client' },
  { value: 'technician', label: 'Technician' },
];

class LoginView extends Component {
  state = {
    names: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {
      names: '',
      email: '',
      password: '',
      confirmPassword: '',
      apartment: '',
      userType: '',
    },
    errorMessage: '',
    loading: false,
    selectedOption: null,
    selectedUser: null,
  };

  handleSelect = (selectedOption) => {
    const { errors } = this.state;
    errors.apartment = '';
    this.setState({ selectedOption, errors });
  };

  handleSelectUser = (selectedUser) => {
    const { errors } = this.state;
    errors.userType = '';
    this.setState({ selectedUser, errors });
  };

  handleNames = (e) => {
    const { errors } = this.state;
    errors.names = '';
    this.setState({ errors, names: e.target.value, errorMessage: '' });
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
  handleConfirmPassword = (e) => {
    const { errors } = this.state;
    errors.confirmPassword = '';
    this.setState({
      errors,
      confirmPassword: e.target.value,
      errorMessage: '',
    });
  };

  checkValidation = () => {
    const {
      names,
      email,
      password,
      confirmPassword,
      errors,
      selectedOption,
      selectedUser,
    } = this.state;

    let response = true;

    const data = {
      names,
      email,
      password,
      confirmPassword,
      apartmentId: selectedUser?.value === 'client' ? selectedOption?.value : 1,
      isClient: selectedUser?.value === 'client',
    };

    if (!selectedUser) {
      errors.userType = 'Plese choose user type';
      response = false;
    }
    if (!selectedOption && selectedUser?.value === 'client') {
      errors.apartment = 'Apartment is required';
      response = false;
    }

    if (!names) {
      errors.names = 'Names are required';
      response = false;
    }

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

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm password';
      response = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Password mismatch';
      response = false;
    }

    this.setState({ errors });

    return { data, response };
  };

  handleSubmit = () => {
    const { data, response } = this.checkValidation();
    if (response) {
      this.setState({ loading: true, errorMessage: '' });

      this.props.dispatch(handleSignupUser(data)).then((res) => {
        this.setState({ loading: false });

        if (res.type !== 'LOG_ERROR') {
          message.success('Account created successfully');
          setTimeout(() => {
            this.props.history.push('/login');
          }, 1000);
        } else this.setState({ errorMessage: res.error });
      });
    }
  };

  render() {
    const {
      names,
      email,
      password,
      errors,
      errorMessage,
      loading,
      confirmPassword,
      selectedOption,
      selectedUser,
    } = this.state;
    const { isAuth, apartments } = this.props;

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
                  Create account
                </p>
              </div>
              <div className="mx-auto">
                <img src={Logo} alt="logo" width="100px" />
              </div>
              <div className="login-form">
                <h5 className="text-center">Signup</h5>
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
                <Select
                  value={selectedUser}
                  onChange={this.handleSelectUser}
                  options={userTypes}
                  placeholder="Select User"
                  className="customized-select"
                  isSearchable={false}
                />
                <div className="error-msg-container mb-3">
                  <span className="error-msg-label">{errors.userType}</span>
                </div>
                {selectedUser && selectedUser?.value === 'client' && (
                  <>
                    <Select
                      value={selectedOption}
                      onChange={this.handleSelect}
                      options={apartments}
                      placeholder="Select Apartment"
                      className="customized-select"
                      isSearchable={true}
                    />
                    <div className="error-msg-container mb-3">
                      <span className="error-msg-label">
                        {errors.apartment}
                      </span>
                    </div>
                  </>
                )}
                <TextBox
                  type="text"
                  placeholder="Names"
                  value={names}
                  name="names"
                  onChange={this.handleNames}
                  errorMessage={errors.names}
                />
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
                <TextBox
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={this.handleConfirmPassword}
                  errorMessage={errors.confirmPassword}
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
                    'Signup'
                  )}
                </button>
                <div className="text-center">
                  <span className="d-block border-top signup-label">
                    Already have an account?{' '}
                    <Link to="/login" className="signup-link">
                      Login
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

const mapStateToProps = ({ authedUser, apartments }) => {
  return {
    isAuth: Object.keys(authedUser).length !== 0,
    apartments:
      apartments &&
      Object.values(apartments).map(({ id, name }) => ({
        label: name,
        value: id,
      })),
  };
};

export default connect(mapStateToProps)(LoginView);
