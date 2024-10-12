import React, { useState, useEffect, memo } from "react";
import { GoogleMap, LoadScript, Marker, Libraries } from "@react-google-maps/api";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";

// Simple LoadingSpinner component
const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">Loading...</div>
);

const containerStyle = {
  width: '100%',
  height: '400px',
};

// Define libraries as a constant outside the component
const libraries: Libraries = ['places'];

interface LocationDetailsProps {
  formData: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude: string;
    longitude: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationDetails: React.FC<LocationDetailsProps> = memo(({ formData, handleChange }) => {
  const [showMap, setShowMap] = useState(false);
  const [latitude, setLatitude] = useState(parseFloat(formData.latitude));
  const [longitude, setLongitude] = useState(parseFloat(formData.longitude));
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  const handleToggleMapPoint = () => {
    setShowMap(prev => !prev);
    if (!showMap) {
      setLatitude(parseFloat(formData.latitude));
      setLongitude(parseFloat(formData.longitude));
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setLatitude(lat);
      setLongitude(lng);
    }
  };

  useEffect(() => {
    if (formData.latitude !== latitude.toString()) {
      handleChange({
        target: {
          name: 'latitude',
          value: latitude.toString(),
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }

    if (formData.longitude !== longitude.toString()) {
      handleChange({
        target: {
          name: 'longitude',
          value: longitude.toString(),
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [latitude, longitude, formData, handleChange]);

  return (
    <div className="real-estate-form-section">
      <h3 className="listproperty-h3">Location Details</h3>
      <input
        className="real-estate-form-input"
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <div className="real-estate-form-two-column">
        <input
          className="real-estate-form-input"
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          className="real-estate-form-input"
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <input
        className="real-estate-form-input"
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
      />

      <button
        type="button"
        onClick={handleToggleMapPoint}
        className={showMap ? "remove-map-point-button" : "add-map-point-button"}
      >
        {showMap ? <FaTrash /> : <FaMapMarkerAlt />}
        {showMap ? " Remove Map Point" : " Add Map Point"}
      </button>

      {showMap && (
        <div className="map-container">
          <input
            className="real-estate-form-input"
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={latitude.toFixed(6)} // Display with precision
            readOnly
          />
          <input
            className="real-estate-form-input"
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={longitude.toFixed(6)} // Display with precision
            readOnly
          />
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY || ""}
            libraries={libraries}
          >
            {!isMapLoaded && <LoadingSpinner />}
            {mapError && <div>Error loading map. Please try again.</div>}
            {!mapError && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: latitude, lng: longitude }}
                zoom={12}
                onClick={handleMapClick}
                onLoad={() => setIsMapLoaded(true)}
              >
                <Marker position={{ lat: latitude, lng: longitude }} />
              </GoogleMap>
            )}
          </LoadScript>

          {mapError && (
            <iframe
              title="Google Map"
              width="100%"
              height="400"
              src={`https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_GOOGLE_MAP_KEY || ""}&center=${latitude},${longitude}&zoom=12`}
              style={{ border: '0' }}
              allowFullScreen
            ></iframe>
          )}
        </div>
      )}
    </div>
  );
});

export default LocationDetails;
