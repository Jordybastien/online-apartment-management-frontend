import { SET_AUTHED_USER, LOGOUT_USER, SIGNUP_USER } from './actionTypes';
import { loginUser, signupUser } from '../services/auth';
import { logError } from './error';
import { TOKEN_STORE_KEY } from '../utils/constants';
import { handleAuthedData } from './initialData';

export const setAuthedUser = (user) => {
  return {
    type: SET_AUTHED_USER,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const registerUser = () => {
  return {
    type: SIGNUP_USER,
  };
};

export const handleUserLogin = (user) => {
  return async (dispatch) => {
    try {
      const response = await loginUser(user);
      localStorage.setItem(TOKEN_STORE_KEY, response.data.token);
      dispatch(handleAuthedData());

      return dispatch(setAuthedUser(response.data.user));
    } catch (error) {
      return dispatch(logError('Email or password mismatch'));
    }
  };
};

export const handleSignupUser = (user) => {
  return async (dispatch) => {
    try {
      await signupUser(user);

      return dispatch(registerUser());
    } catch (error) {
      return dispatch(logError('Email already in use'));
    }
  };
};
