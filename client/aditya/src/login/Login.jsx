import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = 'http://localhost:8000';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Store the token in localStorage
        localStorage.setItem('authToken', `Bearer ${data.token}`);
        // Navigate to the protected area
        navigate('/');
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="addUser">
      <h3>Sign in</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="login">
        <p>Don't have an Account? </p>
        <Link to="/signup" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
