import React from 'react';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">Home</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-links">Complain</a>
          </li>
          <li className="nav-item">
            <a href="/services" className="nav-links">Sign Up</a>
          </li>
          <li className="nav-item">
            <a href="/services" className="nav-links">Login</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-links">Profile</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;