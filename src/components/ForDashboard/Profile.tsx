import React, { useState } from 'react';
import '../../styles/Dashboard/Profile.css';
import { FaEdit } from 'react-icons/fa';

const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    contact: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update logic goes here
  };

  return (
    <div className="dashboard-profile-container">
      <h2>User Profile <FaEdit /></h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={userDetails.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="address" value={userDetails.address} onChange={handleChange} placeholder="Address" required />
        <input type="text" name="contact" value={userDetails.contact} onChange={handleChange} placeholder="Contact" required />
        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
