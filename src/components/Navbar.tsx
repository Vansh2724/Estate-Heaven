// src/components/Navbar.tsx

import React, { useContext, useEffect, useState, useRef } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="brand-logo">
            <a href="/">Estate Heaven</a>
          </div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="search">Search Properties</a>
            <a href="list">List Property</a>
            <a href="aboutus">About Us</a>
          </div>
          <div className="auth-section">
            {isAuthenticated ? (
              <>
                <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
                  <span className="user-name">Welcome, {userName}</span>
                  <div className="user-avatar" style={{ backgroundColor: avatarColor }}>
                    {userName[0]?.toUpperCase()}
                  </div>
                  {showDropdown && (
                     <div className="user-dropdown" ref={dropdownRef}>
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
              <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
