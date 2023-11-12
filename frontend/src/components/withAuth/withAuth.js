import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth;
