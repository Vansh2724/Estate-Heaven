import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SearchSection from '../ForSearch/SearchSection';
import SearchResults from '../ForSearch/SearchResults';
import PropertyDetailsOverlay from '../pages/PropertyDetailsOverlay'; // Import the overlay component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  pincode: string;           // Add these missing fields
  address: string;
  ownerContact: string;
  ownerEmail: string;
}


const SearchProperty: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null); // Overlay state

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

  return (
    <>
      {/* Navbar is kept intact */}
      <Navbar />
      
      {/* Main search section and results */}
      <div className="search-property-page">
        {/* Toast notifications for feedback */}
        <ToastContainer />
        
        {/* Search section for searching properties */}
        <SearchSection
          setProperties={setProperties}
          setTotalPages={setTotalPages}
          setSearchExecuted={setSearchExecuted}
        />
        
        {/* Search results */}
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
              openPropertyDetails={openPropertyDetails} // Open overlay when property is clicked
            />
          )}
          {searchExecuted && properties.length === 0 && (
            <div className="no-properties">No properties found.</div>
          )}
        </div>

        {/* Overlay for Property Details */}
        <PropertyDetailsOverlay
  property={properties.find(p => p._id === selectedPropertyId) || null}
  onClose={closeOverlay}
/>


      </div>

      {/* Footer remains unchanged */}
      <Footer />
    </>
  );
};

export default SearchProperty;
