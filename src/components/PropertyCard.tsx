import React from 'react';
import '../styles/PropertyCard.css';

interface PropertyCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ image, title, description, price }) => {
  return (
    <div className="property-card">
      <img src={image} alt={title} className="property-image" />
      <div className="property-info">
        <h3 className="property-title">{title}</h3>
        <p className="property-description">{description}</p>
        <div className="property-footer">
          <span className="property-price">{price}</span>
          <button className="property-btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
