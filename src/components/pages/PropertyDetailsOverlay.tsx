import React, { useState, useEffect } from 'react';
import { FaTimes, FaMapMarkerAlt, FaBed, FaBath, FaPhone, FaEnvelope } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/ForDetails/PropertyDetailsOverlay.css';

interface Property {
  _id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  ownerName: string;
  images: string[];
  ownerContact: string;
  ownerEmail: string;
  description: string;
  pincode: string;
  address: string;
}

interface PropertyOverlayProps {
  property: Property | null;
  onClose: () => void;
}

const PropertyDetailsOverlay: React.FC<PropertyOverlayProps> = ({ property, onClose }) => {
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    document.body.style.overflow = property ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [property]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if ((e.target as Element).classList.contains('property-overlay')) {
        onClose();
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  if (!property) return null;

  const openSlider = (index: number) => {
    setSelectedImage(index);
    setSliderOpen(true);
  };

  const closeSlider = () => {
    setSliderOpen(false);
  };

  const formatPrice = (price: number) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const sliderSettings = {
    initialSlide: selectedImage,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="property-overlay">
      <div className="property-overlay-content">
        <button className="property-overlay-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="property-overlay-image-section">
          <img
            src={property.images[0]}
            alt="Main Property"
            className="property-overlay-main-image"
            onClick={() => openSlider(0)}
          />
          <div className="property-overlay-small-images">
            {property.images.slice(1, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property Thumbnail ${index + 1}`}
                className="property-overlay-small-image"
                onClick={() => openSlider(index + 1)}
              />
            ))}
          </div>
        </div>

        <div className="property-overlay-section">
          <h2 className="property-overlay-title">{property.title}</h2>
          <h3 className="property-overlay-price">{formatPrice(property.price)}</h3>
          <p className="property-overlay-description">{property.description}</p>
        </div>

        <div className="property-overlay-location property-overlay-section">
          <h4>Location Details</h4>
          <p><FaMapMarkerAlt /> <strong>City:</strong> {property.city}</p>
          <p><strong>State:</strong> {property.state}</p>
          <p><strong>Pincode:</strong> {property.pincode}</p>
          <p><strong>Address:</strong> {property.address}</p>
        </div>

        <div className="property-overlay-utilities property-overlay-section">
          <h4>Utilities</h4>
          <p><FaBed /> <strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p><FaBath /> <strong>Bathrooms:</strong> {property.bathrooms}</p>
          <p><strong>Area:</strong> {property.area} sq. ft.</p>
        </div>

        <div className="property-overlay-owner-info property-overlay-section">
          <h4>Owner Information</h4>
          <p><strong>Owner:</strong> {property.ownerName}</p>
          <p><FaPhone /> <strong>Contact:</strong> {property.ownerContact}</p>
          <p><FaEnvelope /> <strong>Email:</strong> {property.ownerEmail}</p>
        </div>
      </div>

      {isSliderOpen && (
        <div className="property-overlay-slider">
          <button className="property-overlay-slider-close-btn" onClick={closeSlider}>
            <FaTimes />
          </button>
          <Slider {...sliderSettings}>
            {property.images.map((image, index) => (
              <div key={index} className="property-overlay-slider-image-container">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="property-overlay-slider-image"
                  onError={(e) => { e.currentTarget.src = '/path/to/default/image.jpg'; }} // Fallback image
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsOverlay;
