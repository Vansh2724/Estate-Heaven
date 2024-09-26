import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBed, FaBath, FaHome, FaRulerCombined, FaUtensils, FaCouch, FaMapMarkerAlt, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import '../../styles/SearchPage/SearchSection.css';

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
  setProperties: React.Dispatch<React.SetStateAction<any[]>>;
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

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/property/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setProperties(result.data); // Assuming properties are in result.data
        toast.success(result.message); // Show success toast
      } else {
        toast.error(result.message); // Show error toast
      }
    } catch (error) {
      toast.error('Network error: Unable to fetch properties.'); // Handle network errors
    }
  };
  

  return (
    <div className="custom-search-container">
      <h1 className="custom-search-title">Find Your Dream Property</h1>

      <div className="custom-service-type-toggle">
        <div 
          className={`custom-service-type-box ${serviceType === 'buy' ? 'active' : ''}`} 
          onClick={() => setServiceType('buy')}
        >
          Buy
        </div>
        <div 
          className={`custom-service-type-box ${serviceType === 'rent' ? 'active' : ''}`} 
          onClick={() => setServiceType('rent')}
        >
          Rent
        </div>
      </div>

      <div className="custom-search-form">
        <div className="custom-search-input-group">
          <FaMapMarkerAlt className="custom-search-icon" />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={searchParams.city}
            onChange={handleFilterChange}
            aria-label="City"
          />
        </div>
        <div className="custom-search-input-group">
          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={searchParams.pinCode}
            onChange={handleFilterChange}
            aria-label="Pin Code"
          />
        </div>

        {filtersOpen && (
          <div className="custom-filters">
            <div className="custom-filter-group">
              <FaHome className="custom-filter-icon" />
              <select name="propertyType" onChange={handleFilterChange} aria-label="Property Type">
                <option value="">Select Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>
            <div className="custom-filter-group">
              <FaBed className="custom-filter-icon" />
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={searchParams.bedrooms}
                onChange={handleFilterChange}
                aria-label="Bedrooms"
              />
            </div>
            <div className="custom-filter-group">
              <FaBath className="custom-filter-icon" />
              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={searchParams.bathrooms}
                onChange={handleFilterChange}
                aria-label="Bathrooms"
              />
            </div>
            <div className="custom-filter-group">
              <FaCouch className="custom-filter-icon" />
              <input
                type="number"
                name="halls"
                placeholder="Halls"
                value={searchParams.halls}
                onChange={handleFilterChange}
                aria-label="Halls"
              />
            </div>
            <div className="custom-filter-group">
              <FaUtensils className="custom-filter-icon" />
              <input
                type="number"
                name="kitchens"
                placeholder="Kitchens"
                value={searchParams.kitchens}
                onChange={handleFilterChange}
                aria-label="Kitchens"
              />
            </div>
            <div className="custom-filter-group">
              <FaRulerCombined className="custom-filter-icon" />
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

        <button className="custom-toggle-filters" onClick={toggleFilters}>
          <FaFilter /> {filtersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <button className="custom-search-button" onClick={handleSearch}>Search</button>

      <div className="custom-sorting">
        <label>Sort by:</label>
        <select name="sort" onChange={handleFilterChange} aria-label="Sort Options">
          <option value="">Select</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
        <FaSortAmountDown className="custom-sort-icon" />
      </div>
    </div>
  );
};

export default SearchSection;
