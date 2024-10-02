import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import AboutUs from './components/pages/AboutUs';
import ForgotPassword from './components/authentication/ForgotPassword';
import PrivateRoute from './components/PrivateRoute'; 
import PublicRoute from './components/PublicRoute'; // Import the PublicRoute component
import SearchProperty from './components/pages/SearchProperty'; 
import ListProperty from './components/pages/ListProperty';
import Dashboard from './components/pages/Dashboard';
import PropertyDetailsPage from './components/pages/PropertyDetailsOverlay';
import './App.css'; // Import global styles

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/search" element={<SearchProperty />} />
          <Route path="/list" element={<ListProperty />} />

          {/* Private routes */}
          <Route path="/dashboard/*" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          {/* Public routes for signup and login wrapped in PublicRoute */}
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/forgot-password" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
