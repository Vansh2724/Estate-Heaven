import React from 'react';
import { FaBed, FaBath, FaCouch, FaUtensils, FaRulerCombined, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import '../../styles/SearchPage/SearchResults.css';

interface Property {
  _id: string; // MongoDB uses _id as the identifier
  title: string;
  price: number;
  type: string;
  for: string; // For sale or rent
  city: string;
  state: string;
  pincode: string;
  bedrooms: number;
  hall: number;
  kitchen: number;
  bathrooms: number;
  area: number;
  ownerName: string;
  ownerContact: string;
  ownerEmail: string;
  images: string[]; // Assuming it's an array of image URLs
  isFavorite: boolean; // Local state for favorites
}

interface SearchResultsProps {
  properties: Property[];
  favorites: string[]; // Using string for MongoDB ObjectId
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  toggleFavorite: (id: string) => void; // Using string for MongoDB ObjectId
}

const SearchResults: React.FC<SearchResultsProps> = ({ properties, currentPage, totalPages, onPageChange, toggleFavorite }) => {
  if (properties.length === 0) {
    return <div className="no-properties">No properties found.</div>;
  }

  return (
    <div className="custom-property-grid">
      {properties.map((property) => (
        <div key={property._id} className="custom-property-card">
          <div className="custom-property-header">
            <div className="custom-property-type-for">
              <span className="custom-property-type-badge">{property.type}</span>
              <span className="custom-property-for-badge">{property.for}</span>
            </div>
            <FaHeart
              className={`custom-heart-icon ${property.isFavorite ? 'favorite' : ''}`}
              onClick={() => toggleFavorite(property._id)}
            />
          </div>
          <img src={property.images[0]} alt={property.title} className="custom-property-image" />
          <div className="custom-property-info">
            <h3 className="custom-property-title">{property.title}</h3>
            <hr />
            <div className="custom-property-location-owner">
              <span className="custom-property-location"><FaMapMarkerAlt /> {property.city}, {property.state}</span>
              <span className="custom-property-owner">{property.ownerName}</span>
            </div>
            <div className="custom-property-bhkbs">
              <span><FaBed /> {property.bedrooms} Bedrooms</span>
              <span><FaCouch /> {property.hall} Hall</span>
              <span><FaUtensils /> {property.kitchen} Kitchen</span>
              <span><FaBath /> {property.bathrooms} Bathrooms</span>
              <span><FaRulerCombined /> {property.area} sq. ft.</span>
            </div>
            <div className="custom-property-footer">
              <span className="custom-property-price">${property.price}</span>
              <button className="custom-property-btn">View Details</button>
            </div>
          </div>
        </div>
      ))}
      <div className="custom-pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
