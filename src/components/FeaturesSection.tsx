import React from 'react';
import '../styles/FeaturesSection.css';

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <h2>Why Choose Estate Heaven?</h2>
      <div className="features-container">
        <div className="feature-item">
          <img src="https://via.placeholder.com/100" alt="Feature 1" />
          <h3>Extensive Listings</h3>
          <p>Find properties across different cities with detailed descriptions and photos.</p>
        </div>
        <div className="feature-item">
          <img src="https://via.placeholder.com/100" alt="Feature 2" />
          <h3>Advanced Search Filters</h3>
          <p>Use our powerful search filters to find properties that match your exact needs.</p>
        </div>
        <div className="feature-item">
          <img src="https://via.placeholder.com/100" alt="Feature 3" />
          <h3>Secure Transactions</h3>
          <p>Enjoy a secure and reliable platform for all your property buying and selling needs.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
