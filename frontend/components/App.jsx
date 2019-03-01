import React from 'react';
import LoginFormContainer from './session_form/LoginFormContainer';
import SignupFormContainer from './session_form/SignupFormContainer';
import { AuthRoute } from '../actions/route_util';
import DemoLoginContainer from './session_form/DemoLoginContainer';
import { SplashAuthRoute } from './home/SplashAuthRoute';

const App = () => (
  <div className="app">
    <Switch>
      <AuthRoute path='/login' component={LoginFormContainer} />
      <AuthRoute path='/signup' component={SignupFormContainer} />
      <AuthRoute path='/demo' component={DemoLoginContainer} />
      <SplashAuthRoute exact path="/" />
    </Switch>
  </div>
)

export default App;