import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../styles/Dashboard/Dashboard.css';
import { FaHome, FaUser, FaCrown, FaSlidersH, FaBuilding, FaBars, FaTimes } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user.id : null; // Extract the user ID

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
  };

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';
  }, [isSidebarOpen]);

  return (
    <>
      <div className="dashboard-menu-icon" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="dashboard-sidebar">
          <h2 className="sidebar-title"> User Dashboard</h2>
          <ul className="dashboard-sidebar-links">
            <li>
              <Link to={`/dashboard/profile/${userId}`} className="dashboard-sidebar-link"><FaUser /> Profile</Link>
            </li>
            <li>
              <Link to={`/dashboard/myproperties/${userId}`} className="dashboard-sidebar-link"><FaBuilding /> My Properties</Link>
            </li>
            <li>
              <Link to={`/dashboard/premium/${userId}`} className="dashboard-sidebar-link"><FaCrown /> Premium</Link>
            </li>
            <li>
              <Link to={`/dashboard/settings/${userId}`} className="dashboard-sidebar-link"><FaSlidersH /> Settings</Link>
            </li>
            <li>
              <Link to="/" className="dashboard-sidebar-link"><FaHome /> Home</Link>
            </li>
          </ul>
        </div>
        <div className="dashboard-main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
