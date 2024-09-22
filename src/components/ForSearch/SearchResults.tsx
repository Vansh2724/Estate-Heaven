import React from 'react';
import { FaBed, FaBath, FaCouch, FaUtensils, FaRulerCombined, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import '../../styles/SearchPage/SearchResults.css';


interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  image: string;
  isFavorite: boolean;
  type: string; // Assuming type is included
  owner: string;
  for:string, // Assuming owner is included
  bhkbs: {
    bedrooms: number;
    bathrooms: number;
    hall: number;
    kitchen: number;
    area: number;
  };
}

interface SearchResultsProps {
  properties: Property[];
  favorites: number[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  toggleFavorite: (index: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ properties, currentPage, totalPages, onPageChange }) => {
  const toggleFavorite = (id: number) => {
    // Implement favorite toggle logic here
  };

  return (
    <div>
      <div className="property-grid">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <div className="property-header">
              <div className="property-type-for">
                <span className="property-type-badge">{property.type}</span>
                {/* Assuming a 'for' field for sale/rent indication */}
                <span className="property-for-badge">{property.for}</span>
              </div>
              <FaHeart
                className={`heart-icon ${property.isFavorite ? 'favorite' : ''}`}
                onClick={() => toggleFavorite(property.id)}
              />
            </div>
            <img src={property.image} alt={property.title} className="property-image" />
            <div className="property-info">
              <h3 className="property-title">{property.title}</h3>
              <hr />
              <div className="property-location-owner">
                <span className="property-location"><FaMapMarkerAlt /> {property.location}</span>
                <span className="property-owner">{property.owner}</span>
              </div>
              <div className="property-bhkbs">
                <span><FaBed /> {property.bhkbs.bedrooms} Bedrooms</span>
                <span><FaCouch /> {property.bhkbs.hall} Hall</span>
                <span><FaUtensils /> {property.bhkbs.kitchen} Kitchen</span>
                <span><FaBath /> {property.bhkbs.bathrooms} Bathrooms</span>
                <span><FaRulerCombined /> {property.bhkbs.area} sq. ft.</span>
              </div>
              <div className="property-footer">
                <span className="property-price">${property.price}</span>
                <button className="property-btn">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
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
