import React, { useState, useEffect } from "react";
import {
  FaBed,
  FaBath,
  FaCouch,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import PropertyDetailsOverlay from "../pages/PropertyDetailsOverlay";
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
  const [itemsPerPage, setItemsPerPage] = useState<number>(12); // Default to 12 for desktop
  const navigate = useNavigate();

  // Update itemsPerPage based on window width
  const updateItemsPerPage = () => {
    if (window.innerWidth < 768) { // Example breakpoint for mobile
      setItemsPerPage(10);
    } else {
      setItemsPerPage(12);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const openPropertyDetails = (propertyId: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      setSelectedPropertyId(propertyId);
    } else {
      navigate("/login");
    }
  };

  const closePropertyDetails = () => {
    setSelectedPropertyId(null);
  };

  const totalPagesCount = Math.ceil(properties.length / itemsPerPage);

  const displayedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const createPaginationNumbers = () => {
    const paginationNumbers: number[] = [];
    const maxDisplayed = 3;

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPagesCount, currentPage + 1);

    if (totalPagesCount > maxDisplayed) {
      if (currentPage === 1) {
        endPage = Math.min(maxDisplayed, totalPagesCount);
      } else if (currentPage === totalPagesCount) {
        startPage = Math.max(totalPagesCount - 2, 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(i);
    }

    return paginationNumbers;
  };

  const paginationNumbers = createPaginationNumbers();

  const formatPrice = (price: number, forRent: boolean) => {
    const priceStr = price.toString();
    const [integerPart, decimalPart] = priceStr.split(".");
    const lastThreeDigits = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3);
    const formattedIntegerPart = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherDigits.length ? "," : "") + lastThreeDigits;
    return `₹${formattedIntegerPart}` + (forRent ? " /month" : "");
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
