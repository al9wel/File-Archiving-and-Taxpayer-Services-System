import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect to dashboard if user is already authenticated
    return <Navigate to={ROUTES.DASHBOARD.MAIN} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
