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
import './App.css'; // Import global styles

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Navbar will be present on all pages */}
        {/* <Navbar /> */}
        <Routes>
          {/* Route for the homepage */}
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/search" element={<SearchProperty />} />
          <Route path="/list" element={<ListProperty />} />
          {/* Route for the Signup page */}
          <Route path="/signup" element={<PrivateRoute><Signup /></PrivateRoute>} />
          <Route path="/login" element={<PrivateRoute><Login /></PrivateRoute>} />
          <Route path="/forgot-password" element={<PrivateRoute><ForgotPassword /></PrivateRoute>} /> {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
