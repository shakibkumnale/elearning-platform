import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // If already authenticated, redirect to videos page
  if (isAuthenticated) {
    return <Navigate to="/videos" replace />;
  }

  return children;
};

export default PublicRoute;
