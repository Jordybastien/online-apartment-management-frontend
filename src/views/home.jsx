import React, { Component, Fragment } from 'react';
import Navbar from '../components/navbar';
import { connect } from 'react-redux';
import ClientHome from '../components/clientHome';
import TechnicianHome from '../components/technicianHome';

class HomeView extends Component {
  state = {};

  render() {
    const { authedUser, requests } = this.props;

    return (
      <Fragment>
        <Navbar />
        <div className="container mt-3 home-container">
          {authedUser.Role.roleValue === 0 ? (
            <ClientHome />
          ) : (
            <TechnicianHome />
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(HomeView);
