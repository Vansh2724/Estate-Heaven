import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import '../../styles/SearchPage/SearchSection.css';

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

interface SearchParams {
  city: string;
  state: string;
  stateIso2: string;
  for: string; // Represents "Sale" or "Rent"
}

interface State {
  name: string;
  iso2: string;
}

interface SearchSectionProps {
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setSearchExecuted: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}


const SearchSection: React.FC<SearchSectionProps> = ({
  setProperties,
  setTotalPages,
  setSearchExecuted,
  loading,
  setLoading,
}) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    city: '',
    state: '',
    stateIso2: '',
    for: 'Buy',
  });

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const req = await fetch('https://api.countrystatecity.in/v1/countries/IN/states', {
          method: 'GET',
          headers: {
            'X-CSCAPI-KEY': process.env.REACT_APP_LOCATION_AUTHORIZATION_KEY || '',
          },
        });

        if (req.ok) {
          const stateData = await req.json();
          const stateNames = stateData.map((state: State) => ({
            name: state.name,
            iso2: state.iso2,
          }));
          stateNames.sort((a: State, b: State) => a.name.localeCompare(b.name));
          setStates(stateNames);
        } else {
          throw new Error('Failed to fetch states');
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const fetchCities = async (stateIso2: string) => {
    try {
      const req = await fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${stateIso2}/cities`, {
        method: 'GET',
        headers: {
          'X-CSCAPI-KEY': process.env.REACT_APP_LOCATION_AUTHORIZATION_KEY || '',
        },
      });

      if (req.ok) {
        const cityData = await req.json();
        const cityNames = cityData.map((city: { name: string }) => city.name);
        cityNames.sort((a: string, b: string) => a.localeCompare(b));
        setCities(cityNames);
      } else {
        throw new Error('Failed to fetch cities');
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStateIso2 = event.target.value;
    const selectedState = states.find(state => state.iso2 === selectedStateIso2);

    if (selectedState) {
      setSearchParams(prev => ({
        ...prev,
        state: selectedState.name,
        stateIso2: selectedStateIso2,
      }));
      fetchCities(selectedStateIso2);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setSearchParams(prev => ({ ...prev, city: selectedCity }));
  };

  const toggleFilters = () => setFiltersOpen(prev => !prev);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const filteredParams = {
        city: searchParams.city,
        state: searchParams.state,
        for: searchParams.for === 'Buy' ? 'sale' : 'rent',
      };

      const response = await axios.post(`${process.env.REACT_APP_SERVER_API_URL}/api/property/search`, filteredParams, {
        headers: {
          'Content-Type': 'application/json',
        },
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-section-search-container">
      <h1 className="search-section-search-title">Find Your Dream Property</h1>

      <div className="search-section-service-type-toggle">
        <div
          className={`search-section-service-type-box ${searchParams.for === 'Buy' ? 'active' : ''}`}
          onClick={() => setSearchParams(prev => ({ ...prev, for: 'Buy' }))}>
          Buy
        </div>
        <div
          className={`search-section-service-type-box ${searchParams.for === 'Rent' ? 'active' : ''}`}
          onClick={() => setSearchParams(prev => ({ ...prev, for: 'Rent' }))}>
          Rent
        </div>
      </div>

      <div className="search-section-search-form">
        <div className="search-section-search-input-group">
          <FaMapMarkerAlt className="search-section-search-icon" />
          <select
            name="state"
            onChange={handleStateChange}
            value={searchParams.stateIso2}
            aria-label="State">
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state.iso2}>{state.name}</option>
            ))}
          </select>
        </div>
        <div className="search-section-search-input-group">
          <FaMapMarkerAlt className="search-section-search-icon" />
          <select
            name="city"
            onChange={handleCityChange}
            value={searchParams.city}
            aria-label="City">
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <button className="search-section-search-button" onClick={handleSearch}>Search</button>
      </div>
      {loading && <div className="loader" />}
    </div>
  );
};

export default SearchSection;
