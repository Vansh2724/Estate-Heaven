import React, { useState } from "react";
import {
  FaBed,
  FaBath,
  FaCouch,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import PropertyDetailsOverlay from "../pages/PropertyDetailsOverlay";
import "../../styles/SearchPage/SearchResults.css";

interface Property {
  _id: string;
  title: string;
  price: number;
  type: string;
  for: string; // This should specify whether it's for rent or sale
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
  onFavoriteToggle: (propertyId: string) => void;
  toggleFavorite: (propertyId: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  searchExecuted: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  properties,
  favorites,
  currentPage,
  onPageChange,
  toggleFavorite,
  searchExecuted,
}) => {
  const { state, city, for: rentOrBuy } = useParams();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const itemsPerPage = 3; // Fixed for this example
  const navigate = useNavigate(); // Initialize navigate

  const openPropertyDetails = (propertyId: string) => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setSelectedPropertyId(propertyId); // User is logged in, open property details
    } else {
      // Navigate to the login page if not logged in
      navigate("/login");
    }
  };

  const closePropertyDetails = () => {
    setSelectedPropertyId(null);
  };

  // Total pages calculation based on properties length and items per page
  const totalPagesCount = Math.ceil(properties.length / itemsPerPage);

  // Paginated properties
  const displayedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Create dynamic pagination numbers
  const createPaginationNumbers = () => {
    const paginationNumbers: number[] = [];
    const maxDisplayed = 3; // Total buttons to display

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPagesCount, currentPage + 1);

    // Adjust start and end based on the current page
    if (totalPagesCount > maxDisplayed) {
      if (currentPage === 1) {
        endPage = Math.min(maxDisplayed, totalPagesCount); // Show pages 1, 2, 3
      } else if (currentPage === totalPagesCount) {
        startPage = Math.max(totalPagesCount - 2, 1); // Show last three pages
      } else {
        // For pages in between
        startPage = Math.max(1, currentPage - 1);
        endPage = Math.min(totalPagesCount, currentPage + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(i);
    }

    return paginationNumbers;
  };

  const paginationNumbers = createPaginationNumbers();

  // Function to format price in Indian currency style
  const formatPrice = (price: number, forRent: boolean) => {
    // Convert price to string
    const priceStr = price.toString();
    const [integerPart, decimalPart] = priceStr.split(".");

    // Format the integer part according to the Indian numbering system
    const lastThreeDigits = integerPart.slice(-3); // Get the last three digits
    const otherDigits = integerPart.slice(0, -3); // Get the rest of the digits
    const formattedIntegerPart = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherDigits.length ? "," : "") + lastThreeDigits;

    const formattedPrice = `₹${formattedIntegerPart}` + (forRent ? " /month" : "");

    return formattedPrice;
  };

  return (
    <section className="search-result">
      <h2 className="search-result-title">Search Results</h2>

      {searchExecuted && properties.length === 0 && (
        <div className="no-properties">No properties found.</div>
      )}
      <div className="search-result-grid">
        {displayedProperties.map((property) => (
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
            <img
              src={property.images[0]}
              alt={property.title}
              className="search-result-image"
            />
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
                <span>
                  <FaBed /> {property.bedrooms} Bedrooms
                </span>
                <span>
                  <FaCouch /> {property.hall} Hall
                </span>
                <span>
                  <FaBath /> {property.bathrooms} Bathrooms
                </span>
                <span>
                  <FaCouch /> {property.kitchen} Kitchen
                </span>
                <span>
                  <FaCouch /> {property.area} sq. ft.
                </span>
              </div>
              <div className="search-result-footer">
                <span className="search-result-price">
                  {formatPrice(property.price, property.for === 'rent')}
                </span>
                <button
                  className="search-result-btn"
                  onClick={() => openPropertyDetails(property._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="search-result-pagination">
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        
        {paginationNumbers.map(pageNumber => (
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? "active" : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPagesCount}>&gt;</button>
        <button onClick={() => onPageChange(totalPagesCount)} disabled={currentPage === totalPagesCount}>&gt;&gt;</button>
      </div>

      {selectedPropertyId && (
        <PropertyDetailsOverlay
          property={properties.find((prop) => prop._id === selectedPropertyId) || null}
          onClose={closePropertyDetails}
        />
      )}
    </section>
  );
};

export default SearchResults;
