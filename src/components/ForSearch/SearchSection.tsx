import React, { useState } from 'react';
import { FaBed, FaBath, FaHome, FaRulerCombined, FaUtensils, FaCouch, FaMapMarkerAlt, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import '../../styles/SearchPage/SearchSection.css'; // Custom styles for the Search page

interface SearchParams {
  city: string;
  state: string;
  pinCode: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  halls: string;
  kitchens: string;
  area: string;
  sort: string;
}

interface SearchSectionProps {
  setProperties: React.Dispatch<React.SetStateAction<any[]>>; // Function passed as prop to set search results
}

const SearchSection: React.FC<SearchSectionProps> = ({ setProperties }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [serviceType, setServiceType] = useState('buy');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    city: '',
    state: '',
    pinCode: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    halls: '',
    kitchens: '',
    area: '',
    sort: ''
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFilters = () => setFiltersOpen(prev => !prev);

  const handleSearch = () => {
    // Placeholder for search logic (e.g., API call to fetch properties)
    const sampleProperties = [
      { id: 1, name: "Property 1", city: "New York", price: 100000 },
      { id: 2, name: "Property 2", city: "San Francisco", price: 200000 }
    ];
    setProperties(sampleProperties);
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Find Your Dream Property</h1>

      {/* Service Type (Buy/Rent) */}
      <div className="service-type-toggle">
        <div 
          className={`service-type-box ${serviceType === 'buy' ? 'active' : ''}`} 
          onClick={() => setServiceType('buy')}
        >
          Buy
        </div>
        <div 
          className={`service-type-box ${serviceType === 'rent' ? 'active' : ''}`} 
          onClick={() => setServiceType('rent')}
        >
          Rent
        </div>
      </div>

      {/* Search Form */}
      <div className="search-form">
        <div className="search-input-group">
          <FaMapMarkerAlt className="search-icon" />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={searchParams.city}
            onChange={handleFilterChange}
            aria-label="City"
          />
        </div>
        <div className="search-input-group">
          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={searchParams.pinCode}
            onChange={handleFilterChange}
            aria-label="Pin Code"
          />
        </div>

        {/* Filters Section */}
        {filtersOpen && (
          <div className="filters">
            <div className="filter-group">
              <FaHome className="filter-icon" />
              <select name="propertyType" onChange={handleFilterChange} aria-label="Property Type">
                <option value="">Select Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>
            <div className="filter-group">
              <FaBed className="filter-icon" />
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={searchParams.bedrooms}
                onChange={handleFilterChange}
                aria-label="Bedrooms"
              />
            </div>
            <div className="filter-group">
              <FaBath className="filter-icon" />
              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={searchParams.bathrooms}
                onChange={handleFilterChange}
                aria-label="Bathrooms"
              />
            </div>
            <div className="filter-group">
              <FaCouch className="filter-icon" />
              <input
                type="number"
                name="halls"
                placeholder="Halls"
                value={searchParams.halls}
                onChange={handleFilterChange}
                aria-label="Halls"
              />
            </div>
            <div className="filter-group">
              <FaUtensils className="filter-icon" />
              <input
                type="number"
                name="kitchens"
                placeholder="Kitchens"
                value={searchParams.kitchens}
                onChange={handleFilterChange}
                aria-label="Kitchens"
              />
            </div>
            <div className="filter-group">
              <FaRulerCombined className="filter-icon" />
              <input
                type="text"
                name="area"
                placeholder="Area (sq ft)"
                value={searchParams.area}
                onChange={handleFilterChange}
                aria-label="Area"
              />
            </div>
          </div>
        )}

        {/* Show Filters Button */}
        <button className="toggle-filters" onClick={toggleFilters}>
          <FaFilter /> {filtersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Search Button */}
      <button className="search-button" onClick={handleSearch}>Search</button>

      {/* Sorting Section */}
      <div className="sorting">
        <label>Sort by:</label>
        <select name="sort" onChange={handleFilterChange} aria-label="Sort Options">
          <option value="">Select</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
        <FaSortAmountDown className="sort-icon" />
      </div>
    </div>
  );
};

export default SearchSection;
