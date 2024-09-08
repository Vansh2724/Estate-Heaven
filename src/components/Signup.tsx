import React, { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import '../styles/Signup.css';
import openEyeIcon from '../img/lgsp/openeye.svg';
import closeEyeIcon from '../img/lgsp/closeeye.svg';
import googleLogo from '../img/lgsp/googlelogo.png';

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
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false); // Password validation state
  const [errorMessage, setErrorMessage] = useState<string>(''); // Error message for invalid password

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handlePasswordFocus = () => setPasswordFocused(true);
  const handlePasswordBlur = () => setPasswordFocused(false);

  const validatePassword = (password: string) => {
    const lengthValid = password.length >= 10;
    const upperCaseValid = /[A-Z]/.test(password);
    const lowerCaseValid = /[a-z]/.test(password);
    const numberValid = /\d/.test(password);
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordValid(lengthValid && upperCaseValid && lowerCaseValid && numberValid && specialCharValid);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="signup-btn" >Sign Up</button>
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
