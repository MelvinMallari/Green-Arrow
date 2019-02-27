import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login, logout } from './actions/session_actions';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {

  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // session_API testing
  window.signup = signup;
  window.login = login;
  window.logout = logout;
  // session_API testing

  // store testing
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // store testing

  ReactDOM.render(<Root store={store} />, root);
});