import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/Login.css";
import openEyeIcon from "../img/lgsp/openeye.svg";
import closeEyeIcon from "../img/lgsp/closeeye.svg";
import googleLogo from "../img/lgsp/googlelogo.png";

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" }); // Track form data

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-header">Estate Heaven</h1>
        <h3 className="login-header2">Welcome Back</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container full-width">
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              className="input"
              required
              value={formData.email} // Controlled input value
            />
            <label
              className={`floating-label-l ${formData.email ? "filled" : ""}`}
            >
              Email Address
            </label>
          </div>
          <div className="password-container input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              onChange={handleInputChange}
              className="input"
              required
              value={formData.password} // Controlled input value
            />
            <label
              className={`floating-label-l ${formData.password ? "filled" : ""}`}
            >
              Password
            </label>
            <img
              src={passwordVisible ? closeEyeIcon : openEyeIcon}
              alt="Toggle Password Visibility"
              className="toggle-icon"
              onClick={togglePasswordVisibility}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="signup-text-container">
          <p className="signup-text">
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign up now
            </a>
          </p>
          <p className="forgot-password-text">
            <a href="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </a>
          </p>
        </div>

        <div className="alternative-login">
          <div className="divider">
            <span className="divider-text">Or login with</span>
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

export default Login;
