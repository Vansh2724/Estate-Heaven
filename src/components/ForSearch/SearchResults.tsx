import React, { useState } from "react";
import {
  FaBed,
  FaBath,
  FaCouch,
  FaUtensils,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaHeart,
  FaSortAmountDown,
  FaBuilding
} from "react-icons/fa";
import "../../styles/SearchPage/SearchResults.css";

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
  pincode: string;
  address: string;
  ownerContact: string;
  ownerEmail: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface SearchResultsProps {
  properties: Property[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  searchExecuted: boolean;
  openPropertyDetails: (propertyId: string) => void;
  onApplyFilters: (filters: any) => void;
  filters: {
    state: string | undefined;
    city: string | undefined;
    for: string;
  };
}


const SearchResults: React.FC<SearchResultsProps> = ({
  properties,
  favorites,
  currentPage,
  totalPages,
  onPageChange,
  toggleFavorite,
  searchExecuted,
  openPropertyDetails,
  onApplyFilters,
}) => {
  const [filters, setFilters] = useState({
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    halls: "",
    kitchens: "",
    area: "",
    sort: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = () => {
    if (Object.values(filters).some(filter => filter === "")) {
      alert("Please fill out all fields before applying filters.");
      return;
    }
    onApplyFilters(filters); // Send filters to the server
    onPageChange(1); // Reset to the first page
  };

  return (
    <section className="search-result">
      <h2 className="search-result-title">Search Results</h2>

      {/* Filters Display */}
      <div className="filter-container">
        <div className="filter-inputs">
          <div className="filter-item">
            <FaBuilding />
            <select
              name="propertyType"
              className="filter-select"
              onChange={handleFilterChange}
              aria-label="Property Type"
            >
              <option value="">Select Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>
          <div className="filter-item">
            <FaBed />
            <input
              type="number"
              name="bedrooms"
              className="filter-input"
              placeholder="Beds"
              value={filters.bedrooms}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-item">
            <FaBath />
            <input
              type="number"
              name="bathrooms"
              className="filter-input"
              placeholder="Baths"
              value={filters.bathrooms}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-item">
            <FaCouch />
            <input
              type="number"
              name="halls"
              className="filter-input"
              placeholder="Halls"
              value={filters.halls}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-item">
            <FaUtensils />
            <input
              type="number"
              name="kitchens"
              className="filter-input"
              placeholder="Kitchens"
              value={filters.kitchens}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-item">
            <FaRulerCombined />
            <input
              type="number"
              name="area"
              className="filter-input"
              placeholder="Area (sq. ft.)"
              value={filters.area}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-item">
            <FaSortAmountDown />
            <select
              name="sort"
              className="filter-select"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="">Sort</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <button className="apply-button" onClick={handleApplyFilters}>
          Apply
        </button>
      </div>

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
                className={`search-result-heart-icon ${favorites.includes(property._id) ? "favorite" : ""}`}
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
                <button className="search-result-btn" onClick={() => openPropertyDetails(property._id)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="search-result-pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </section>
  );
};

export default SearchResults;
