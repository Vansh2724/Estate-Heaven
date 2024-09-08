import React from 'react';
import '../styles/PropertySection.css'; // Import the CSS styles
import { FaBed, FaBath, FaHome, FaRulerCombined, FaCouch } from 'react-icons/fa'; // Importing icons

const PropertySection: React.FC = () => {
  // Sample data for properties
  const properties = [
    {
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU5ODk5Nzcy&ixlib=rb-1.2.1&q=80&w=1080',
      title: 'Modern Family Home',
      description: 'A beautiful 4-bedroom house located in a serene neighborhood with modern amenities.',
      price: '₹45,00,000', // Converted to INR
      type: 'For Sale',
      bhkbs: {
        bedrooms: 4,
        hall: 1,
        kitchen: 1,
        bathrooms: 2,
        area: 2500, // in sq. ft.
      },
    },
    {
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU5ODk5Nzcy&ixlib=rb-1.2.1&q=80&w=1080',
      title: 'Cozy Apartment',
      description: 'A stylish apartment in the heart of the city, close to all major attractions.',
      price: '₹90,000/month', // Converted to INR
      type: 'For Rent',
      bhkbs: {
        bedrooms: 2,
        hall: 1,
        kitchen: 1,
        bathrooms: 1,
        area: 1200, // in sq. ft.
      },
    },
    {
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU5ODk5Nzcy&ixlib=rb-1.2.1&q=80&w=1080',
      title: 'Luxury Villa',
      description: 'An exquisite villa with a stunning view and luxurious facilities.',
      price: '₹1,20,00,000', // Converted to INR
      type: 'For Sale',
      bhkbs: {
        bedrooms: 5,
        hall: 2,
        kitchen: 2,
        bathrooms: 4,
        area: 5000, // in sq. ft.
      },
    },
  ];

  return (
    <section className="property-section">
      <h2 className="property-section-title">Explore Our Featured Properties</h2>
      <p className="property-section-description">
        Discover a variety of properties that match your lifestyle. Whether you are looking for a family home, a cozy apartment, or a luxurious villa, we have it all.
      </p>
      <div className="property-grid">
        {properties.map((property, index) => (
          <div key={index} className="property-card">
            <div className="property-type-badge">{property.type}</div>
            <img src={property.image} alt={property.title} className="property-image" />
            <div className="property-info">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-description">{property.description}</p>
              <div className="property-bhkbs">
                <span><FaBed /> {property.bhkbs.bedrooms} BHK</span>
                <span><FaCouch /> {property.bhkbs.hall} Hall</span>
                <span><FaHome /> {property.bhkbs.kitchen} Kitchen</span>
                <span><FaBath /> {property.bhkbs.bathrooms} Bathrooms</span>
                <span><FaRulerCombined /> {property.bhkbs.area} sq. ft.</span>
              </div>
              <div className="property-footer">
                <span className="property-price">{property.price}</span>
                <button className="property-btn">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertySection;
