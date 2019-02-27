import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  const GreetingLoggedIn = () => {
    return (
      <div>
        <h2>Welcome to Green Arrow! {currentUser.username}</h2>
        <button onClick={logout}>Logout</button>        
      </div>
    );
  }

  const GreetingLoggedOut = () => {
    return (
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    )
  }

  return currentUser ? GreetingLoggedIn() : GreetingLoggedOut()
}

export default Greeting;