import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import error from './error';
import link from './callBackLink';
import loading from './loading';
import authedUser from './authedUser';
import apartments from './apartments';
import requests from './requests';

export default combineReducers({
  error,
  toastr: toastrReducer,
  link,
  loading,
  authedUser,
  apartments,
  requests,
});
