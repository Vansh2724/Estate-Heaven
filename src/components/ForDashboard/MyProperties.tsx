import React from 'react';
import '../../styles/Dashboard/MyProperties.css';

const MyProperties: React.FC = () => {
  return (
    <div className="my-properties-wrapper">
      <h2 className="my-properties-title">My Properties</h2>
      <div className="properties-grid">
        <div className="property-card">
          <h3 className="property-title">123 Main St, Cityville</h3>
          <p className="property-status">Status: Listed</p>
          <button className="property-details-button">View Details</button>
        </div>
        <div className="property-card">
          <h3 className="property-title">456 Oak Ave, Townsville</h3>
          <p className="property-status">Status: Sold</p>
          <button className="property-details-button">View Details</button>
        </div>
        {/* More properties can be added here */}
      </div>
    </div>
  );
};

export default MyProperties;
