import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {jwtDecode} from 'jwt-decode';
import Modal from './shared/modal';

const isAuthenticated = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.role;
    } catch (e) {
      console.error('Error decoding token:', e);
      return false;
    }
  }
  return false;
};

const ProtectedRoute = ({ component: Component,role, ...rest }) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (isAuthenticated() != role && role != 0) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  if (isAuthenticated() === role || isAuthenticated() === 1) {
    return <Component {...rest} />;
  } else {
    return showModal ? (
      <Modal data="Anda tidak memiliki akses ke laman berikut" status="error" />
    ) : (
      <Navigate to="/" />
    );
  }
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
