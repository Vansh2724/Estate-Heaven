import React from 'react';
import '../../styles/Dashboard/Profile.css';

const Profile: React.FC = () => {
  return (
    <div className="profile-wrapper">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-card">
        <div className="profile-info">
          <div className="profile-field">
            <label className="profile-label">Name:</label>
            <span className="profile-value">John Doe</span>
          </div>
          <div className="profile-field">
            <label className="profile-label">Email:</label>
            <span className="profile-value">johndoe@example.com</span>
          </div>
          <div className="profile-field">
            <label className="profile-label">Phone:</label>
            <span className="profile-value">+1 234 567 8901</span>
          </div>
        </div>
        <button className="profile-edit-button">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
