import React from 'react';
import { connect } from 'react-redux';
import Logo from '../assets/logo_cut.png';
import { Link } from 'react-router-dom';
import TecPic from '../assets/tec.jpeg';
import Feature from '../assets/Feature.png';
import Report from '../assets/Report.png';

const HomeView = (props) => {
  const { isAuth } = props;
  return (
    <div className="homepage-wrapper">
      <div className="homepage-container">
        <section id="nav" className="custom-nav-home">
          <div className="container">
            <div className="row d-flex justify-content-between pt-4">
              <div>
                <img
                  src={Logo}
                  alt="Apartment Management System"
                  className="logo"
                />
                {/* <span className="about-us-title">Quiz App</span> */}
              </div>
              <div className="menu-container">
                {!isAuth ? (
                  <div onClick={() => props.history.push('/login')}>
                    <span className="nav-label">Login</span>
                  </div>
                ) : (
                  <div onClick={() => props.history.push('/dashboard')}>
                    <span className="nav-label">Dashboard</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section id="about-us" className="about-us">
          <div className="container">
            <div className="row">
              <div className="col-md-8 pt-5">
                <div className="mb-3">
                  {/* <span className="about-us-title">Quiz App</span> */}
                </div>
                <div>
                  <span className="about-us-description">
                    Here at Apartment management system ,home service and repair
                    is our passion. We take pride in the quality of our work
                    because we want you to live comfortably in your home. our
                    team of experts can solve any problem we make sure out
                    Technician arrive on time and complete the job as fast as
                    possible. We bring reliability and excellence to every job.
                      To make a service request please{' '}
                    <Link to="/signup">Signup</Link> and place the service
                    request. We will be with you shortly
                  </span>
                </div>
              </div>
              <div
                className={`col-md-4 d-flex ${
                  window.screen.width > 600
                    ? 'justify-content-end'
                    : 'justify-content-center'
                }`}
              >
                <img
                  src={TecPic}
                  alt="Apartment Management System"
                  className="tec-pic"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features-section" className="features-section">
          <div className="container">
            <div className="row features-row">
              <div className="mb-3">
                <span className="features-title">FEATURES</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 d-flex flex-direction-row single-feature">
                <img
                  src={Feature}
                  alt=""
                  className="feature-img-square"
                />
                <div className="d-flex align-items-center pl-3">
                  <span className="feature-label">Send Request</span>
                </div>
              </div>
              <div className="col-md-4 d-flex flex-direction-row single-feature">
                <img
                  src={Report}
                  alt=""
                  className="feature-img"
                />
                <div className="d-flex align-items-center pl-3">
                  <span className="feature-label">Receive request</span>
                </div>
              </div>
              <div className="col-md-4 d-flex flex-direction-row single-feature">
                <img
                  src={Feature}
                  alt=""
                  className="feature-img-square"
                />
                <div className="d-flex align-items-center pl-3">
                  <span className="feature-label">Solve request</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="footer" className="footer">
          <div className="container my-3">
            <div className="row">
              <span className="footer-label">
                © COPYRIGHT {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </section>
        <div className="bottom-line">
          <span className="block-1" />
          <span className="block-2" />
          <span className="block-3" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    isAuth: Object.keys(authedUser).length !== 0,
  };
};

export default connect(mapStateToProps)(HomeView);
