import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import HomeView from '../views/home';
import LoginView from '../views/login';
import ProtectedRoute from '../components/protectedRoute';
import SignupView from '../views/signup';

const Routing = () => {
  return (
    <>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        getState={(state) => state.toastr}
        progressBar
        closeOnToastrClick
      />
      <Router>
        <Switch>
          <ProtectedRoute path="/" exact component={HomeView} />
          <Route path="/login" component={LoginView} />
          <Route path="/signup" component={SignupView} />
        </Switch>
      </Router>
    </>
  );
};

export default Routing;
