import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // For redirection after signup
import { ToastContainer, toast } from 'react-toastify'; // Import Toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import '../../styles/authentication/Signup.css'; // Import custom styles
import openEyeIcon from '../../img/lgsp/openeye.svg'; // Import open eye icon
import closeEyeIcon from '../../img/lgsp/closeeye.svg'; // Import close eye icon
import googleLogo from '../../img/lgsp/googlelogo.png'; // Import Google logo
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext for user authentication

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const authContext = useContext(AuthContext); // Use AuthContext for managing authentication state

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login } = authContext; // Destructure login from context
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false); // State for confirm password visibility
  const [formFields, setFormFields] = useState<FormFields>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false); // State for password input focus
  const [passwordValid, setPasswordValid] = useState<boolean>(false); // Password validation state

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible); // Toggle password visibility
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible); // Toggle confirm password visibility

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value })); // Update form fields state

    if (name === 'password') {
      validatePassword(value); // Validate password on input change
    }
  };

  const handlePasswordFocus = () => setPasswordFocused(true); // Handle password input focus
  const handlePasswordBlur = () => setPasswordFocused(false); // Handle password input blur

  // Function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Function to validate password strength
  const validatePassword = (password: string) => {
    const lengthValid = password.length >= 10;
    const upperCaseValid = /[A-Z]/.test(password);
    const lowerCaseValid = /[a-z]/.test(password);
    const numberValid = /\d/.test(password);
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordValid(lengthValid && upperCaseValid && lowerCaseValid && numberValid && specialCharValid);
  };

  // Handle form submission
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // Validate email format
  if (!isValidEmail(formFields.email)) {
    toast.error('Invalid email format. Please enter a valid email address.');
    return;
  }

  // Check if passwords match
  if (formFields.password !== formFields.confirmPassword) {
    toast.error('Passwords do not match!');
    return;
  }

  // Validate password strength
  if (!passwordValid) {
    toast.error('Password does not meet the criteria for strength.');
    return;
  }

  try {
    // Make API request for signup
    const response = await axios.post('http://localhost:5000/api/auth/signup', {
      firstName: formFields.firstName,
      lastName: formFields.lastName,
      email: formFields.email,
      password: formFields.password,
    });

    if (response.status === 201) { // Assume 201 is the success status
      toast.success('Signup successful!');

      // Ensure response contains token and user
      const { token, user } = response.data;
      
      if (token && user) {
        // Log the user in after successful signup
        login(token, user); // Use login function from AuthContext to set authentication state
        navigate('/'); // Redirect to homepage after successful signup
      } else {
        console.error('Signup response does not contain token or user data:', response.data);
        toast.error('Signup failed. Invalid server response. Please try again.');
      }
    } else if (response.status === 400) {
      toast.error('Invalid input. Please check your details and try again.');
    } else if (response.status === 409) {
      toast.error('An account with this email already exists.');
    } else {
      toast.error('Signup failed. Please try again.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API error response:', error.response);
        toast.error(error.response.data.message || 'An error occurred during signup. Please try again.');
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response from server. Please try again later.');
      } else {
        console.error('Error setting up request:', error.message);
        toast.error('An error occurred. Please try again.');
      }
    } else {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  }
};

  return (
    <div className="signup-wrapper">
      <ToastContainer /> {/* Toast Container for notifications */}
      <div className="signup-box">
        <h1 className="signup-header">Estate Heaven</h1>
        <h3 className="signup-header2">Create Account</h3>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="name-fields">
            <div className="input-container">
              <input
                type="text"
                name="firstName"
                value={formFields.firstName}
                onChange={handleInputChange}
                className="input"
                required
              />
              <label className={formFields.firstName ? 'floating-label-s filled' : 'floating-label-s'}>
                First Name
              </label>
            </div>
            <div className="input-container">
              <input
                type="text"
                name="lastName"
                value={formFields.lastName}
                onChange={handleInputChange}
                className="input"
                required
              />
              <label className={formFields.lastName ? 'floating-label-s filled' : 'floating-label-s'}>
                Last Name
              </label>
            </div>
          </div>
          <div className="input-container full-width">
            <input
              type="email"
              name="email"
              value={formFields.email}
              onChange={handleInputChange}
              className="input"
              required
            />
            <label className={formFields.email ? 'floating-label-s filled' : 'floating-label-s'}>
              Email Address
            </label>
          </div>
          <div className="password-container input-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              value={formFields.password}
              onChange={handleInputChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className={`input ${passwordFocused ? (passwordValid ? 'valid' : 'invalid') : ''}`}
              required
            />
            <label className={formFields.password ? 'floating-label-s filled' : 'floating-label-s'}>
              Password
            </label>
            <img
              src={passwordVisible ? closeEyeIcon : openEyeIcon}
              alt="Toggle Password Visibility"
              className="toggle-icon"
              onClick={togglePasswordVisibility}
            />
            {passwordFocused && !passwordValid && (
              <div className="password-hint">
                At least 10 characters with a mix of upper/lowercase, numbers, and symbols.
              </div>
            )}
          </div>
          <div className="password-container input-container">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              name="confirmPassword"
              value={formFields.confirmPassword}
              onChange={handleInputChange}
              className="input"
              required
            />
            <label className={formFields.confirmPassword ? 'floating-label-s filled' : 'floating-label-s'}>
              Confirm Password
            </label>
            <img
              src={confirmPasswordVisible ? closeEyeIcon : openEyeIcon}
              alt="Toggle Confirm Password Visibility"
              className="toggle-icon"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <div className="login-text-container">
          <p className="login-text">
            Already have an account? <a href="/login" className="login-link">Login now</a>
          </p>
        </div>

        <div className="alternative-login">
          <div className="divider">
            <span className="divider-text">Or sign up with</span>
          </div>
          <button className="google-btn">
            <img src={googleLogo} alt="Google Logo" className="google-icon" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
