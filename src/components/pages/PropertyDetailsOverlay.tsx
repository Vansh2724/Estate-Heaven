import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderGif from '../../img/images/Loaders.gif'; // Correct path for the loader GIF
import '../../styles/ForDetails/PropertyDetailsOverlay.css'; // Create styles specific for overlay

interface PropertyDetailsOverlayProps {
  propertyId: string;
  onClose: () => void;
}

interface PropertyDetails {
  title: string;
  description: string;
  price: number;
  type: string;
  for: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  bedrooms: number;
  hall: number;
  kitchen: number;
  bathrooms: number;
  area: number;
  ownerName: string;
  ownerContact: string;
  ownerEmail: string;
  images: string[];
}

const PropertyDetailsOverlay: React.FC<PropertyDetailsOverlayProps> = ({ propertyId, onClose }) => {
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`http://localhost:5000/api/propertyview/${propertyId}`);
        setPropertyDetails(response.data);
      } catch (error: any) {
        toast.error('Error fetching property details');
      } finally {
        setLoading(false); 
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="overlay-loader-container">
        <img src={LoaderGif} alt="Loading..." className="loader-gif" />
      </div>
    );
  }

  if (!propertyDetails) {
    return <div className="overlay-content">Unable to load property details.</div>;
  }

  return (
    <div className="property-details-overlay">
      <div className="overlay-content">
        <button className="close-overlay" onClick={onClose}>Close</button>
        <h1>{propertyDetails.title}</h1>
        <p>{propertyDetails.description}</p>
        <p>Price: ${propertyDetails.price}</p>
        <p>Type: {propertyDetails.type}, For: {propertyDetails.for}</p>
        <p>City: {propertyDetails.city}, State: {propertyDetails.state}</p>
        <p>Bedrooms: {propertyDetails.bedrooms}, Hall: {propertyDetails.hall}, Kitchen: {propertyDetails.kitchen}</p>
        <p>Bathrooms: {propertyDetails.bathrooms}, Area: {propertyDetails.area} sq. ft.</p>
        <p>Owner: {propertyDetails.ownerName} | Contact: {propertyDetails.ownerContact} | Email: {propertyDetails.ownerEmail}</p>
        <div className="property-images">
          {propertyDetails.images.map((image, index) => (
            <img key={index} src={image} alt={propertyDetails.title} className="property-image" />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PropertyDetailsOverlay;
