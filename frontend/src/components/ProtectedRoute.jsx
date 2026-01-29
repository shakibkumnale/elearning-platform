import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If admin-only route and user is not admin, redirect to videos
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/videos" replace />;
  }

  return children;
};

export default ProtectedRoute;
