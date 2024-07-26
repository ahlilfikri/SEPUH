import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Function to check login status
const isAuthenticated = () => {
  return !!sessionStorage.getItem('token');
};

// HOC component for route protection
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
