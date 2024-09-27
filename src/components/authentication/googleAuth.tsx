import axios from 'axios';
import { AuthContextType } from '../../contexts/AuthContext'; // Make sure to import the correct type

export const handleGoogleAuth = async (credential: string, authContext: AuthContextType, isSignup: boolean) => {
  try {
    const endpoint = isSignup 
      ? 'http://localhost:5000/api/auth/google-signup' 
      : 'http://localhost:5000/api/auth/google-login';

    // Send a POST request to the API with the Google token
    const response = await axios.post(endpoint, { token: credential });

    const { token, user } = response.data;

    // Check if we received both token and user data
    if (token && user) {
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify({ id: user._id, ...user }));
      localStorage.setItem('token', token);

      // Call the context's login method
      authContext.login(token, user);
      
      return true; // Successful login/signup
    }
  } catch (error) {
    // Handle specific errors based on response or error type
    console.error('Google auth error:', error);
    return false; // Login/signup failed
  }
};
