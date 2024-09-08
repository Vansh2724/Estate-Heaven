import React from 'react';
import '../styles/HeroSection.css';  // Importing the CSS file for styling

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Your Dream Home Awaits</h1>
        <p>Find the perfect place to live with Estate Heaven.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for city, locality, or property" />
          <button className="search-btn">Search</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
