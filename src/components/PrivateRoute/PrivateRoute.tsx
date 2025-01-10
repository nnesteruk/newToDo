import React from 'react';
import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = ({ ...props }) => {
  const isAuth = localStorage.getItem('token') || undefined;
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
