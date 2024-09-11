import React, { useState } from 'react';
import '../styles/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'; // Prevent scrolling behind the panel
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
          <div className="auth-buttons-desktop">
            <a href="/signup" className="nav-btn signup">Sign Up</a>
            <a href="/login" className="nav-btn login">Login</a>
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
        <div className="auth-buttons">
          <a href="/signup" className="nav-btn signup" onClick={toggleMenu}>Sign Up</a>
          <a href="/login" className="nav-btn login" onClick={toggleMenu}>Login</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
