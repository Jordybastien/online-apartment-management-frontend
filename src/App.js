import React, { Component } from 'react';
import Routing from './router';
import { connect } from 'react-redux';
import { decodeToken } from './services/auth';
import { TOKEN_STORE_KEY } from './utils/constants';
import { setAuthedUser } from './actions/authedUser';
import { handleInitialData, handleAuthedData } from './actions/initialData';
import ReactLoading from 'react-loading';
import Logo from './assets/logo_cut.png';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
    const user = refreshUser(this.props);
    if (user) this.props.dispatch(handleAuthedData());
  }

  render() {
    refreshUser(this.props);
    const { loading } = this.props;

    return loading ? (
      <div className="loading-container">
        <img src={Logo} alt="logo" width="150px" />
        <ReactLoading
          type={'bars'}
          color={'#272262'}
          height={'10%'}
          width={'10%'}
          className="loading-container"
        />
      </div>
    ) : (
      <Routing />
    );
  }
}

const mapStateToProps = ({ loading, authedUser }) => {
  return {
    loading,
    isAuth: Object.keys(authedUser).length !== 0,
  };
};

export default connect(mapStateToProps)(App);

const refreshUser = (props) => {
  const user = decodeToken();

  if (user) {
    const currentTime = Date.now() / 1000;
    if (user.exp < currentTime) {
      localStorage.removeItem(TOKEN_STORE_KEY);
      props.history.push('/');
    }
    props.dispatch(setAuthedUser(user));
    return user;
  }
};
