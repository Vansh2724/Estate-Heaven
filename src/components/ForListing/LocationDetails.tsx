import React from "react";

const LocationDetails: React.FC<{ formData: any; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ formData, handleChange }) => (
  <div className="real-estate-form-section">
    <h3 className="listproperty-h3">Location Details</h3>
    <input className="real-estate-form-input" type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
    <div className="real-estate-form-two-column">
      <input className="real-estate-form-input" type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
      <input className="real-estate-form-input" type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
    </div>
    <input className="real-estate-form-input" type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
  </div>
);

export default LocationDetails;
