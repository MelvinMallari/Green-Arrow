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
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
        <Link to="/demo">Demo Login</Link>
      </nav>
    )
  }

  return currentUser ? GreetingLoggedIn() : GreetingLoggedOut()
}

export default Greeting;