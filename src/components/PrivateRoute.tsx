import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  
  if (authContext?.isAuthenticated) {
    // Redirect logged-in users away from login and signup pages
    return <Navigate to="/" />;
  }
//   else{
//     return <Navigate to="/" />;
//   }

  return children;
};

export default PrivateRoute;
