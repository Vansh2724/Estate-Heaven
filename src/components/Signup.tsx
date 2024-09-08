import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/Signup.css';
import openEyeIcon from '../img/lgsp/openeye.svg';
import closeEyeIcon from '../img/lgsp/closeeye.svg';
import googleLogo from '../img/lgsp/googlelogo.png';

// Define form fields type
interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<FormFields>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="signup-wrapper">
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
              className="input"
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

        {/* Added Login Link */}
        <div className="login-text-container">
          <p className="login-text">
            Already have an account? <a href="/login" className="login-link">Login now</a>
          </p>
        </div>

        <div className="alternative-login">
          {/* Added horizontal line around "Or sign up with" */}
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
