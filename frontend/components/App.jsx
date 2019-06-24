import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import StockShowContainer from './stocks/StockShowContainer';
import LoginFormContainer from './session_form/LoginFormContainer';
import SignupFormContainer from './session_form/SignupFormContainer';
import DemoLoginContainer from './session_form/DemoLoginContainer';
import { AuthRoute, ProtectedRoute } from '../actions/route_util';
import { SplashAuthRoute } from './home/SplashAuthRoute';


const App = () => (
  <div className="app">
    <Switch>
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <AuthRoute path="/demo" component={DemoLoginContainer} />
      <ProtectedRoute path="/stocks/:symbol" component={StockShowContainer} />
      <SplashAuthRoute exact path="/" />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
