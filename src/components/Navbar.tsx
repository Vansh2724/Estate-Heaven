// src/components/Navbar.tsx

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Side panel visibility
  const [showDropdown, setShowDropdown] = useState(false); // User dropdown visibility
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { isAuthenticated, userName, avatarColor, logout } = authContext;

  useEffect(() => {
    // Reset dropdown visibility when authentication status changes
    setShowDropdown(false);
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'; // Prevent scrolling when side panel is open
  };

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out!');
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="brand-logo">
            <a href="/">Estate Heaven</a>
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#search">Search Properties</a>
            <a href="#list">List Property</a>
            <a href="#about">About Us</a>
          </div>
          <div className="auth-section">
            {isAuthenticated ? (
              <>
                <div className="user-profile" onClick={() => setShowDropdown(prev => !prev)}>
                  <span className="user-name">Welcome, {userName}</span>
                  <div className="user-avatar" style={{ backgroundColor: avatarColor }}>
                    {userName[0]?.toUpperCase()}
                  </div>
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
              <div className="auth-buttons-desktop">
                <a href="/signup" className="nav-btn signup">Sign Up</a>
                <a href="/login" className="nav-btn login">Login</a>
              </div>
            )}
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
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
        {!isAuthenticated ? (
          <div className="auth-buttons">
            <a href="/signup" className="nav-btn signup" onClick={toggleMenu}>Sign Up</a>
            <a href="/login" className="nav-btn login" onClick={toggleMenu}>Login</a>
          </div>
        ) : (
          <div className="user-profile-mobile">
            <span className="user-name">Welcome, {userName}</span>
            <div className="user-avatar" style={{ backgroundColor: avatarColor }}>
              {userName[0]?.toUpperCase()}
            </div>
            <div className="user-dropdown-mobile">
              <a href="/dashboard" onClick={toggleMenu}>Dashboard</a>
              <a href="/my-properties" onClick={toggleMenu}>My Properties</a>
              <a href="/messages" onClick={toggleMenu}>Messages</a>
              <a href="/settings" onClick={toggleMenu}>Settings</a>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
