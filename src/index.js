import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

