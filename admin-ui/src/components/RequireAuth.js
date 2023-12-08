import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ isLoggedIn }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
