import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SearchSection from '../ForSearch/SearchSection';
import SearchResults from '../ForSearch/SearchResults';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import '../../styles/SearchPage/SearchProperty.css'; // Custom styles for the entire search page

const SearchProperty: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (index: number) => {
    setFavorites(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      <Navbar />
      <div className="search-property-page">
        <ToastContainer /> {/* Add the ToastContainer here */}
        <div className="search-property-content">
          <SearchSection setProperties={setProperties} />
          <SearchResults 
            properties={properties} 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
            currentPage={0} 
            totalPages={0} 
            onPageChange={() => {}} // Placeholder for onPageChange function
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchProperty;
