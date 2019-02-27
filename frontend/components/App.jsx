import React from 'react';
import GreetingContainer, {} from './greeting/GreetingContainer';
import { Route } from 'react-router-dom';
import LoginFormContainer from './session_form/LoginFormContainer';
import SignupFormContainer from './session_form/SignupFormContainer';
import { AuthRoute } from '../actions/route_util';


const App = () => (
  <div>
    <h1>Welcome to Green Arrow</h1>
    <GreetingContainer />
    <AuthRoute path='/login' component={LoginFormContainer} />
    <AuthRoute path='/signup' component={SignupFormContainer} />
  </div>
)

export default App;