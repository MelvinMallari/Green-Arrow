import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import SplashLoggedOut from './SplashLoggedOut';
import SplashLoggedInContainer from './SplashLoggedInContainer';
import { connect } from 'react-redux';

const SplashAuth = ({loggedIn, path, exact}) => (
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

export const SplashAuthRoute = withRouter(connect(mapStateToProps)(SplashAuth));