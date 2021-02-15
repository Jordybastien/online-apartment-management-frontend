import jwtDecode from 'jwt-decode';
import api from './api';
import { TOKEN_STORE_KEY } from '../utils/constants';

export const loginUser = async (userInfo) => {
  try {
    const res = await api.post('auth/login', userInfo);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
};

export const signupUser = async (userInfo) => {
  try {
    const res = await api.post('auth/signup', userInfo);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
};

export const decodeToken = () => {
  const token = localStorage.getItem(TOKEN_STORE_KEY);
  return token ? jwtDecode(token) : null;
};
