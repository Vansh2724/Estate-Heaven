import axios from "axios";
import { AuthContextType } from "../../contexts/AuthContext";

export const handleGoogleAuth = async (credential: string, authContext: AuthContextType, isSignup: boolean) => {
  try {
    const endpoint = isSignup 
      ? `${process.env.REACT_APP_SERVER_API_URL}/api/auth/google-signup` 
      : `${process.env.REACT_APP_SERVER_API_URL}/api/auth/google-login`;

    // Send a POST request to the API with the Google token
    const response = await axios.post(endpoint, { token: credential });

    const { token, user } = response.data;  // Destructure the response to get token and user

    // Check if we received both token and user data
    if (token && user) {
      // Store the user data in localStorage, making sure the userId is embedded inside the user object
      const userWithId = { ...user, id: user._id };  // Add the userId field inside the user object
      localStorage.setItem('user', JSON.stringify(userWithId));  // Store the user object in localStorage
      localStorage.setItem('token', token);  // Store the JWT token

      // Call the context's login or googleLogin method
      if (isSignup) {
        authContext.login(token, user);  // Call login for regular signup
      } else {
        // If it's a login from Google, call googleLogin
        authContext.googleLogin({
          firstName: user.firstName,
          id: user._id,  // Use the userId from user object
        });
      }

      return true;  // Successful login/signup
    }
  } catch (error) {
    console.error('Google auth error:', error);
    return false;  // Login/signup failed
  }
};
