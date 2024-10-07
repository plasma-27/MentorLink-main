import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token; // Check if token exists
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
