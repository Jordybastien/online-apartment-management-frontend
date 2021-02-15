import React, { Component } from 'react';
import Routing from './router';
import { connect } from 'react-redux';
import { decodeToken, tokenKey } from './services/auth';
import { setAuthedUser } from './actions/authedUser';
import { handleInitialData } from './actions/initialData';
import ReactLoading from 'react-loading';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    refreshUser(this.props);
    const { loading } = this.props;

    return loading ? (
      <div>
        <ReactLoading
          type={'bars'}
          color={'#3cc6bc'}
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
      localStorage.removeItem(tokenKey);
      props.history.push('/');
    }
    props.dispatch(setAuthedUser(user));
    return user;
  }
};
