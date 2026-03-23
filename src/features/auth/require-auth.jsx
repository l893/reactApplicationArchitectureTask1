import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from './auth-context';

export const RequireAuth = () => {
  const isAuthenticated = useAuthState();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
