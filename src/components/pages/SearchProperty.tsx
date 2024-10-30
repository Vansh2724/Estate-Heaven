import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SearchSection from '../ForSearch/SearchSection';
import SearchResults from '../ForSearch/SearchResults';
import PropertyDetailsOverlay from '../pages/PropertyDetailsOverlay';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from '../../img/images/Loaders.gif'; // Import the loader GIF
import '../../styles/SearchPage/SearchProperty.css';

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

const SearchProperty: React.FC = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [forValue, setForValue] = useState<string>('rent'); // Default value

  // Open the property details overlay
  const openPropertyDetails = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  // Close the property details overlay
  const closeOverlay = () => {
    setSelectedPropertyId(null);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch new properties based on the page number if applicable
  };

  // Function to fetch properties based on URL parameters
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch(`YOUR_API_ENDPOINT/search?state=${state}&city=${city}&for=${forValue}`);
      const data = await response.json();
      setProperties(data.properties); // Adjust based on your API response structure
      setTotalPages(data.totalPages); // Adjust based on your API response structure
      setSearchExecuted(true);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state && city) {
      fetchProperties();
    }
  }, [state, city, forValue]);

  return (
    <>
      <Navbar />
      
      <div className="search-property-page">
        <ToastContainer />
        
        <SearchSection
      setProperties={setProperties}
      setTotalPages={setTotalPages}
      setSearchExecuted={setSearchExecuted}
      loading={loading}
      setLoading={setLoading}
    />


        {/* Show loader here */}
        {loading && <img src={loader} alt="Loading..." className="loader" />}

        <div className="search-property-search-result">
          {searchExecuted && properties.length > 0 && (
            <SearchResults
              properties={properties}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              searchExecuted={searchExecuted}
              openPropertyDetails={openPropertyDetails}
              filters={{ state, city, for: forValue }} // Add the filters prop
              onApplyFilters={() => { /* Implement the filter logic here */ }} // Add the onApplyFilters prop
            />
          )}
          {searchExecuted && properties.length === 0 && (
            <div className="no-properties">No properties found.</div>
          )}
        </div>

        <PropertyDetailsOverlay
          property={properties.find(p => p._id === selectedPropertyId) || null}
          onClose={closeOverlay}
        />
      </div>

      <Footer />
    </>
  );
};

export default SearchProperty;
