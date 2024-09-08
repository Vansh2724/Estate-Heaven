import React from 'react';
import '../styles/HeroSection.css';  // Importing the CSS file for styling

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Estate Heaven</h1>
        <p>Your journey to finding the perfect home starts here. Discover, Explore, and Fall in Love with your next home.</p>
        <div className="search-bar">
          <input type="text" placeholder="Enter city" />
          <button className="search-btn">
            <i className="fas fa-search"></i> Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
