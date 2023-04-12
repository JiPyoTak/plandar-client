import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useUserStore from '@/stores/user';

const PrivateRoute: React.FC = () => {
  const { user } = useUserStore();

  const isAuthenticated = user !== null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
