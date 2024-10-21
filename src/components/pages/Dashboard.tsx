import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import '../../styles/Dashboard/Dashboard.css';
import Profile from '../ForDashboard/Profile';
import MyProperties from '../ForDashboard/MyProperties';
import Settings from '../ForDashboard/Settings';
import { FaHome, FaUser, FaBuilding, FaEnvelope, FaCog } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve user info from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.id); // Set the userId from the stored user data
    }
  }, []);

  if (!userId) {
    console.error('User ID not found in localStorage');
    return null; // Early return if userId is not found
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <button className="home-button" onClick={() => navigate('/')}>
          <FaHome style={{ marginRight: '10px' }} /> Home
        </button>
        <nav className="sidebar-nav">
          {/* Always include the userId in the Link URLs */}
          <Link className="sidebar-link" to={`/dashboard/profile/${userId}`}>
            <FaUser style={{ marginRight: '10px' }} /> Profile
          </Link>
          <Link className="sidebar-link" to={`/dashboard/myproperties/${userId}`}>
            <FaBuilding style={{ marginRight: '10px' }} /> My Properties
          </Link>
          <Link className="sidebar-link" to={`/dashboard/messages/${userId}`}>
            <FaEnvelope style={{ marginRight: '10px' }} /> Messages
          </Link>
          <Link className="sidebar-link" to={`/dashboard/settings/${userId}`}>
            <FaCog style={{ marginRight: '10px' }} /> Settings
          </Link>
        </nav>
      </aside>

      <main className="dashboard-content">
        <Routes>
          {/* Ensure all paths include the userId as a URL parameter */}
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="myproperties/:userId" element={<MyProperties />} />
          {/* <Route path="messages/:userId" element={<Messages />} /> */}
          <Route path="settings/:userId" element={<Settings />} />
          <Route path="*" element={<Profile />} /> {/* Default route */}
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
