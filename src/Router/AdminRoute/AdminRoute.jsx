import React from 'react';
import UseAuth from '../../Hooks/UseAuth';
import useAdmin from '../../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading||isAdminLoading) {
    return <div className='flex items-center justify-center my-12'><progress className="progress w-56"></progress></div>
  }
  if (user && isAdmin) {
    return children
  }
  return <Navigate to='/' state={{from:location}} replace></Navigate>
};

export default AdminRoute;