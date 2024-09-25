import React from 'react';
import '../../styles/Dashboard/MyProperties.css';
import { FaListAlt, FaTrash } from 'react-icons/fa';

const MyProperties: React.FC = () => {
  const properties = [
    { id: 1, title: 'Beautiful Apartment', description: 'A lovely place to live' },
    { id: 2, title: 'Cozy House', description: 'Perfect for a small family' },
  ];

  return (
    <div className="dashboard-my-properties-container">
      <h2><FaListAlt /> My Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <button>Edit</button>
            <button className="delete-button"><FaTrash /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProperties;
