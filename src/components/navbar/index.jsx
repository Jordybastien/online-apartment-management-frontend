import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authedUser';
import { TOKEN_STORE_KEY } from '../../utils/constants';

class Navbar extends Component {
  logoutUser = () => {
    localStorage.removeItem(TOKEN_STORE_KEY);
    this.props.dispatch(logoutUser());
    this.props.history.push('/');
  };
  render() {
    const { isAuth, authedUser } = this.props;
    
    return (
      <nav className="mb-1 navbar navbar-expand-lg navbar-dark blue lighten-1">
        <div className="container">
          <div
            className="custom-nav"
            id="navbarSupportedContent-555"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto nav-flex-icons">
              {isAuth ? (
                <Fragment>
                  <li className="nav-item avatar">
                    <span className="mr-3 text-white">
                      {authedUser && authedUser.names}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link logout-btn"
                      onClick={this.logoutUser}
                    >
                      Logout
                    </button>
                  </li>
                </Fragment>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    isAuth: authedUser !== null,
    authedUser,
  };
};

export default withRouter(connect(mapStateToProps)(Navbar));
