import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
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
          {/* Route for the Signup page */}
          <Route path="/signup" element={<Signup />} />
          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
