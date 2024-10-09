import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.gif"; // Main login image
import circleImage from "../assets/pro.webp"; // Circular image

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing error

    try {
      // Make the POST request to the backend
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username, // Assuming username is the email here
          password: password,
        }),
      });

      const data = await response.json();

      console.log(data);
      

      if (response.ok) {
        localStorage.setItem("loggedInUser", username);

        // Check user role and navigate to the appropriate page
        if (data.user.role === "mentor") {
          console.log("Login : fetched: ",data);
          
          navigate("/mentorhome", {
            state: { loggedInEmail: data.user.email, mentor: data.user },
          });
        } else {
          navigate("/home", {
            state: { loggedInEmail: data.user.email },
          });
        }
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
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
