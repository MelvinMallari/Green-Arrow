import React from 'react';
import GreetingContainer, {} from './greeting/GreetingContainer';
import { Route } from 'react-router-dom';
import LoginFormContainer from './session_form/LoginFormContainer';
import SignupFormContainer from './session_form/SignupFormContainer';
import { AuthRoute } from '../actions/route_util';
import DemoLoginContainer from './session_form/DemoLoginContainer';
import Splash from '../components/home/splash';


const App = () => (
  <div className="app">
    <Route exact path="/" component={Splash} />
    {/* <AuthRoute exact path='/' component={GreetingContainer} /> */}
    <AuthRoute path='/login' component={LoginFormContainer} />
    <AuthRoute path='/signup' component={SignupFormContainer} />
    <AuthRoute path='/demo' component={DemoLoginContainer} />
  </div>
)

export default App;