import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.gif"; // Main login image
import circleImage from "../assets/pro.webp"; // Circular image
import credentials from "../data/credentials"; // Import credentials from JS file
import mentorData from "../data/mentordata"; // Import mentor data from JS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing error

    // Check if user is present in mentor data
    const mentor = await new Promise((resolve) => {
      setTimeout(() => {
        const foundMentor = mentorData.find(
          (mentor) =>
            mentor.username === username && mentor.password === password
        );
        resolve(foundMentor);
      }, 500); // Simulate network delay
    });

    if (mentor) {
      localStorage.setItem("loggedInUser", username);
      // Navigate to MentorHome if found in mentor data
      navigate("/mentorhome", { state: { loggedInUsername: mentor.username } });
    } else {
      // If not found in mentor data, check in regular credentials (students)
      const user = await new Promise((resolve) => {
        setTimeout(() => {
          const foundUser = credentials.users.find(
            (user) => user.username === username && user.password === password
          );
          resolve(foundUser);
        }, 500); // Simulate network delay
      });

      if (user) {
        localStorage.setItem("loggedInUser", username);
        // Navigate to Home if found in credentials
        navigate("/home", { state: { loggedInUsername: user.username } });
      } else {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="form-section">
        <form className="login-form" onSubmit={handleLogin}>
          {/* Circular image inside the form */}
          <div className="circle-image-container">
            <img src={circleImage} alt="Profile" className="circle-image" />
          </div>
          <h2>Login</h2>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
