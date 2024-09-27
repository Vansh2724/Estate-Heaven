import React from 'react';
import { FaBed, FaBath, FaCouch, FaUtensils, FaRulerCombined, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import '../../styles/SearchPage/SearchResults.css';

interface Property {
  _id: string;
  title: string;
  price: number;
  type: string;
  for: string;
  city: string;
  state: string;
  bedrooms: number;
  hall: number;
  kitchen: number;
  bathrooms: number;
  area: number;
  ownerName: string;
  images: string[];
  isFavorite: boolean;
}

interface SearchResultsProps {
  properties: Property[];
  favorites: string[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  toggleFavorite: (id: string) => void;
  searchExecuted: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  properties,
  favorites,
  currentPage,
  totalPages,
  onPageChange,
  toggleFavorite,
  searchExecuted,
}) => {
  return (
    <section className="search-result">
      <h2 className="search-result-title">Search Results</h2>
      {searchExecuted && properties.length === 0 && (
        <div className="no-properties">No properties found.</div>
      )}
      <div className="search-result-grid">
        {properties.map((property) => (
          <div key={property._id} className="search-result-card">
            <div className="search-result-header">
              <div className="search-result-type-for">
                <span className="search-result-type-badge">{property.type}</span>
                <span className="search-result-for-badge">{property.for}</span>
              </div>
              <FaHeart
                className={`search-result-heart-icon ${favorites.includes(property._id) ? 'favorite' : ''}`}
                onClick={() => toggleFavorite(property._id)}
              />
            </div>
            <img src={property.images[0]} alt={property.title} className="search-result-image" />
            <div className="search-result-info">
              <h3 className="search-result-title-2">{property.title}</h3>
              <hr />
              <div className="search-result-location-owner">
                <span className="search-result-location">
                  <FaMapMarkerAlt /> {property.city}, {property.state}
                </span>
                <span className="search-result-owner">{property.ownerName}</span>
              </div>
              <div className="search-result-bhkbs">
                <span><FaBed /> {property.bedrooms} Bedrooms</span>
                <span><FaCouch /> {property.hall} Hall</span>
                <span><FaUtensils /> {property.kitchen} Kitchen</span>
                <span><FaBath /> {property.bathrooms} Bathrooms</span>
                <span><FaRulerCombined /> {property.area} sq. ft.</span>
              </div>
              <div className="search-result-footer">
                <span className="search-result-price">${property.price}</span>
                <button className="search-result-btn">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="search-result-pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </section>
  );
};

export default SearchResults;
