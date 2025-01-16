import React from 'react';
import UseAuth from '../../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  console.log(user);
  const location = useLocation();
  
  if (loading) {
    return <progress className="progress w-56"></progress>
  }

  if (user) {
    return children
  }
  return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoute;