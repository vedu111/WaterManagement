import React, { useState } from 'react';
import profile_pic from '../../assets/profile.png'
import './NavBar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">Home</a>
          </li>
          <li className="nav-item">
            <a href="/complaintForm" className="nav-links">Complain</a>
          </li>
          {token ? (
            <>
              <li className="nav-item">
                <div className="profile-container" onClick={handleDropdownToggle}>
                  <img
                    src= {profile_pic}
                    alt="Profile"
                    className="profile-pic"
                  />
                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      <a href="/profile" className="dropdown-item">Your Profile</a>
                      <button onClick={handleLogout} className="dropdown-item">Logout</button>
                    </div>
                  )}
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a href="/signup" className="nav-links">Sign Up</a>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-links">Login</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;