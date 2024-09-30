import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Homepage from './components/pages/Homepage';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import AboutUs from './components/pages/AboutUs';
import ForgotPassword from './components/authentication/ForgotPassword';
import PrivateRoute from './components/PrivateRoute'; 
import SearchProperty from './components/pages/SearchProperty'; 
import ListProperty from './components/pages/ListProperty';
import Dashboard from './components/pages/Dashboard';
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

          {/* Protected Routes */}
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
