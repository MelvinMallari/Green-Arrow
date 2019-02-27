import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login, logout } from './util/session_api_util';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();

  // session_API testing
  window.signup = signup;
  window.login = login;
  window.logout = logout;
  // session_API testing

  // store testing
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // store testing

  ReactDOM.render(<h1>Welcome to Green Arrow</h1>, root);
});