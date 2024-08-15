import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ element: Component, isAdminOnly, ...rest }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (isAdminOnly && !currentUser.isAdmin) {
    return <Navigate to="/home" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
