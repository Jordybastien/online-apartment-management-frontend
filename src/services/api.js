import axios from 'axios';
import { TOKEN_STORE_KEY } from '../utils/constants';

const axiosConfiguration = {
  baseURL: 'http://159.89.136.159:3000/api/v1/',
  timeout: 10000,
};

const apiClient = axios.create(axiosConfiguration);

apiClient.interceptors.request.use((request) => {
  const token = localStorage.getItem(TOKEN_STORE_KEY);

  request.headers['Authorization'] = `Bearer ${token}`;

  return request;
});

export default apiClient;
