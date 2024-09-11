import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'; // Add user profile icon

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);  // For side panel visibility
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // For user authentication state
  const [showDropdown, setShowDropdown] = useState(false);  // For user dropdown menu

  // Mock function to check authentication (replace with actual logic)
  useEffect(() => {
    const token = localStorage.getItem('token');  // Check for a token in local storage
    if (token) setIsAuthenticated(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'; // Prevent scrolling behind the panel
  };

  const handleLogout = () => {
    // Clear user authentication data (like token) from storage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setShowDropdown(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Brand Logo */}
          <div className="brand-logo">
            <a href="/">Estate Heaven</a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#search">Search Properties</a>
            <a href="#list">List Property</a>
            <a href="#about">About Us</a>
          </div>

          {/* Authentication Section */}
          <div className="auth-section">
            {isAuthenticated ? (
              <>
                {/* User Profile Section */}
                <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
                  <FaUserCircle className="user-icon" />
                  {showDropdown && (
                    <div className="user-dropdown">
                      <a href="/dashboard">Dashboard</a>
                      <a href="/my-properties">My Properties</a>
                      <a href="/messages">Messages</a>
                      <a href="/settings">Settings</a>
                      <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* If Not Authenticated - Show Login/Sign Up */}
                <div className="auth-buttons-desktop">
                  <a href="/signup" className="nav-btn signup">Sign Up</a>
                  <a href="/login" className="nav-btn login">Login</a>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="menu-icon" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>

      {/* Side Panel for Mobile */}
      <div className={`side-panel ${isOpen ? 'open' : ''}`}>
        <div className="side-panel-close" onClick={toggleMenu}>
          <FaTimes />
        </div>
        <div className="side-panel-content">
          <a href="#home" onClick={toggleMenu}>Home</a>
          <a href="#search" onClick={toggleMenu}>Search Properties</a>
          <a href="#list" onClick={toggleMenu}>List Property</a>
          <a href="#about" onClick={toggleMenu}>About Us</a>
        </div>

        {/* Auth Buttons for Mobile */}
        <div className="auth-buttons">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-btn logout">Logout</button>
          ) : (
            <>
              <a href="/signup" className="nav-btn signup" onClick={toggleMenu}>Sign Up</a>
              <a href="/login" className="nav-btn login" onClick={toggleMenu}>Login</a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
