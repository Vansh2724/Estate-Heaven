import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaBed, FaBath, FaHome, FaRulerCombined, FaUtensils, FaCouch, FaMapMarkerAlt, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import axios from 'axios';
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
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setSearchExecuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchSection: React.FC<SearchSectionProps> = ({ setProperties, setTotalPages, setSearchExecuted }) => {
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
    if (!searchParams.city.trim()) {
      toast.error('Please enter at least the city information.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/property/search', searchParams, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = response.data;

      setProperties(result.data);
      setTotalPages(result.totalPages);
      setSearchExecuted(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Network error: Unable to fetch properties.');
      }
    }
  };

  return (
    <div className="search-section-search-container">
      <h1 className="search-section-search-title">Find Your Dream Property</h1>

      <div className="search-section-service-type-toggle">
        <div 
          className={`search-section-service-type-box ${serviceType === 'buy' ? 'active' : ''}`} 
          onClick={() => setServiceType('buy')}
        >
          Buy
        </div>
        <div 
          className={`search-section-service-type-box ${serviceType === 'rent' ? 'active' : ''}`} 
          onClick={() => setServiceType('rent')}
        >
          Rent
        </div>
      </div>

      <div className="search-section-search-form">
        <div className="search-section-search-input-group">
          <FaMapMarkerAlt className="search-section-search-icon" />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={searchParams.city}
            onChange={handleFilterChange}
            aria-label="City"
          />
        </div>
        <div className="search-section-search-input-group">
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
          <div className="search-section-filters">
            <div className="search-section-filter-group">
              <FaHome className="search-section-filter-icon" />
              <select name="propertyType" onChange={handleFilterChange} aria-label="Property Type">
                <option value="">Select Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>
            <div className="search-section-filter-group">
              <FaBed className="search-section-filter-icon" />
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={searchParams.bedrooms}
                onChange={handleFilterChange}
                aria-label="Bedrooms"
              />
            </div>
            <div className="search-section-filter-group">
              <FaBath className="search-section-filter-icon" />
              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={searchParams.bathrooms}
                onChange={handleFilterChange}
                aria-label="Bathrooms"
              />
            </div>
            <div className="search-section-filter-group">
              <FaCouch className="search-section-filter-icon" />
              <input
                type="number"
                name="halls"
                placeholder="Halls"
                value={searchParams.halls}
                onChange={handleFilterChange}
                aria-label="Halls"
              />
            </div>
            <div className="search-section-filter-group">
              <FaUtensils className="search-section-filter-icon" />
              <input
                type="number"
                name="kitchens"
                placeholder="Kitchens"
                value={searchParams.kitchens}
                onChange={handleFilterChange}
                aria-label="Kitchens"
              />
            </div>
            <div className="search-section-filter-group">
              <FaRulerCombined className="search-section-filter-icon" />
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

        <button className="search-section-toggle-filters" onClick={toggleFilters}>
          <FaFilter /> {filtersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <button className="search-section-search-button" onClick={handleSearch}>Search</button>

      <div className="search-section-sorting">
        <label>Sort by:</label>
        <select name="sort" onChange={handleFilterChange} aria-label="Sort Options">
          <option value="">Select</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
        <FaSortAmountDown className="search-section-sort-icon" />
      </div>
    </div>
  );
};

export default SearchSection;
