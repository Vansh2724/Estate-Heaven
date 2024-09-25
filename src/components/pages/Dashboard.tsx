import React, { useState } from 'react';
import '../../styles/Dashboard/Dashboard.css';
import Profile from '../ForDashboard/Profile';
import MyProperties from '../ForDashboard/MyProperties';
import { FaHome, FaUser, FaBuilding } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<'profile' | 'myProperties'>('profile');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Profile />;
      case 'myProperties':
        return <MyProperties />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Estate Heaven</h2>
          <button className="home-button" onClick={() => window.location.href = '/'}>
            <FaHome /> Home
          </button>
        </div>
        <button onClick={() => setActiveComponent('profile')}><FaUser /> Profile</button>
        <button onClick={() => setActiveComponent('myProperties')}><FaBuilding /> My Properties</button>
      </div>
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
