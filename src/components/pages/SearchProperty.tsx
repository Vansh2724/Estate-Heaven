import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SearchSection from '../ForSearch/SearchSection';
import SearchResults from '../ForSearch/SearchResults';
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
}

const SearchProperty: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch new properties based on the page number if applicable
  };

  return (
    <>
      <Navbar />
      <div className="search-property-page">
        <ToastContainer />
        <SearchSection 
          setProperties={setProperties} 
          setTotalPages={setTotalPages} 
          setSearchExecuted={setSearchExecuted} 
        />
        <div className="search-property-search-result">
          {searchExecuted && properties.length > 0 && (
            <SearchResults 
              properties={properties}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange} 
              searchExecuted={searchExecuted} // Pass searchExecuted correctly
            />
          )}
          {searchExecuted && properties.length === 0 && (
            <div className="no-properties">No properties found.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchProperty;
