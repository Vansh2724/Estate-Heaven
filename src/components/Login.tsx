import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/Login.css";
import axios from "axios";
import openEyeIcon from "../img/lgsp/openeye.svg";
import closeEyeIcon from "../img/lgsp/closeeye.svg";
import googleLogo from "../img/lgsp/googlelogo.png";
import { ToastContainer, toast } from "react-toastify"; // Importing Toast
import "react-toastify/dist/ReactToastify.css"; // Importing Toast CSS

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      // Handle success
      if (response.status === 200) {
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Store token (you might want to use cookies instead for security reasons)
        localStorage.setItem("token", response.data.token);

        // Redirect or perform post-login actions here
      }
    } catch (error: any) {
      // Handle specific error messages
      if (error.response && error.response.status === 404) {
        toast.error("User not found. Please check your email.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (error.response && error.response.status === 401) {
        toast.error("Invalid password. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("An unexpected error occurred. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="login-wrapper">
      <ToastContainer /> {/* Toast container to show notifications */}
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
              value={formData.email}
            />
            <label className={`floating-label-l ${formData.email ? "filled" : ""}`}>
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
              value={formData.password}
            />
            <label className={`floating-label-l ${formData.password ? "filled" : ""}`}>
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
            Don't have an account? <a href="/signup" className="signup-link">Sign up now</a>
          </p>
          <p className="forgot-password-text">
            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
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
