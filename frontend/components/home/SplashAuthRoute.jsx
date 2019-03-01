import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import SplashLoggedOut from './SplashLoggedOut';
import SplashLoggedInContainer from './SplashLoggedInContainer';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const SplashAuth = ({loggedIn, path, exact, logout}) => (
  <Route path={path} exact={exact} render={props => (
    loggedIn ? (
      <SplashLoggedInContainer {...props} />
    ) : (
      <SplashLoggedOut {...props} />
    )
    )}/>
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export const SplashAuthRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(SplashAuth));