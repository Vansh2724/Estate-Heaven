import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import '../../styles/Dashboard/Dashboard.css';
import Profile from '../ForDashboard/Profile';
import MyProperties from '../ForDashboard/MyProperties';
import Settings from '../ForDashboard/Settings';
import { FaHome, FaUser, FaBuilding, FaEnvelope, FaCog } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <button className="home-button" onClick={() => navigate('/')}>
          <FaHome style={{ marginRight: '10px' }}/> Home
        </button>
        <nav className="sidebar-nav">
          <Link className="sidebar-link" to="profile">
            <FaUser style={{ marginRight: '10px' }}/> Profile
          </Link>
          <Link className="sidebar-link" to="myproperties">
            <FaBuilding style={{ marginRight: '10px' }}/> My Properties
          </Link>
          <Link className="sidebar-link" to="messages">
            <FaEnvelope style={{ marginRight: '10px' }}/> Messages
          </Link>
          <Link className="sidebar-link" to="settings">
            <FaCog style={{ marginRight: '10px' }}/> Settings
          </Link>
        </nav>
      </aside>

      <main className="dashboard-content">
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="myproperties" element={<MyProperties />} />
          {/* <Route path="messages" element={<Messages />} /> */}
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Profile />} /> {/* Default route */}
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
