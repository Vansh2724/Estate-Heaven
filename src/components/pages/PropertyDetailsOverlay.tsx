import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/ForDetails/PropertyDetailsOverlay.css';

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
  ownerContact: string;
  ownerEmail: string;
  address: string;
  pincode: string;
}

interface PropertyOverlayProps {
  property: Property | null;
  onClose: () => void;
}

const PropertyDetailsOverlay: React.FC<PropertyOverlayProps> = ({ property, onClose }) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!property) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openSlider = () => {
    setIsSliderOpen(true);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="overlay-content">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="overlay-header">
          <h2>{property.title}</h2>
          <h3 className="price">${property.price}</h3>
        </div>

        <div className="overlay-body">
          <div className="image-gallery">
            <div className="main-image">
              <img src={property.images[0]} alt="Main Property" onClick={openSlider} />
            </div>
            <div className="other-images">
              {property.images.slice(1, 4).map((image, index) => (
                <img key={index} src={image} alt={`Property Image ${index + 2}`} onClick={openSlider} />
              ))}
            </div>
          </div>

          <div className="property-details">
            <h4>Property Details</h4>
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>For:</strong> {property.for}</p>
            <p><strong>Location:</strong> {property.city}, {property.state} - {property.pincode}</p>
            <p><strong>Address:</strong> {property.address}</p>
            <p><strong>Owner Name:</strong> {property.ownerName}</p>
            <p><strong>Contact:</strong> {property.ownerContact}</p>
            <p><strong>Email:</strong> {property.ownerEmail}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
            <p><strong>Hall:</strong> {property.hall}</p>
            <p><strong>Kitchen:</strong> {property.kitchen}</p>
            <p><strong>Area:</strong> {property.area} sq. ft.</p>
          </div>
        </div>
      </div>

      {/* Full-Screen Slider */}
      {isSliderOpen && (
        <div className="slider-overlay">
          <button className="close-slider-btn" onClick={closeSlider}>
            <FaTimes />
          </button>
          <Slider {...settings}>
            {property.images.map((image, index) => (
              <div key={index} className="slider-image">
                <img src={image} alt={`Slider Image ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsOverlay;
