import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  const { logout } = props;
  return (
    <nav className="nav-logged-in">
      <div className="nav-logged-in-content">
        <div className="nav-logo-container">
          <Link to="/" className="logo"> <i class="fas fa-feather-alt fa-2x"></i></Link>
        </div>
        <div className="nav-logged-in-links">
          <Link to="/" className="black-button link">Home</Link>
          <button onClick={logout} className="black-button">Logout</button>        
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
