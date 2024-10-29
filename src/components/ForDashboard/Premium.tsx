import React from 'react';
import '../../styles/Dashboard/Settings.css';

const Premium: React.FC = () => {
  return (
    <div className="settings-wrapper">
      <h2 className="settings-title">Settings</h2>
      <div className="settings-card">
        <div className="setting-field">
          <label className="setting-label">Notification Preferences:</label>
          <select className="setting-select">
            <option value="all">All Notifications</option>
            <option value="important">Important Only</option>
            <option value="none">No Notifications</option>
          </select>
        </div>
        <div className="setting-field">
          <label className="setting-label">Privacy Settings:</label>
          <select className="setting-select">
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button className="settings-save-button">Save Changes</button>
      </div>
    </div>
  );
};

export default Premium;
