import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  const GreetingLoggedIn = () => {
    return (
      <div>
        <button onClick={logout}>Logout</button>        
      </div>
    );
  }

  const GreetingLoggedOut = () => {
    return (
      <nav className="nav-bar">
        <div className="nav-bar-vertical">
          <div className="nav-bar-holder">
            <Link to="/login"> <span className="black-button"> Login </span> </Link>
            <Link to="/demo"> <span className="black-button"> Demo Login </span> </Link>
            <Link to='/signup'><span className="r-button">Sign Up</span></Link>
          </div>
        </div>
      </nav>
    )
  }

  return currentUser ? GreetingLoggedIn() : GreetingLoggedOut()
}

export default Greeting;