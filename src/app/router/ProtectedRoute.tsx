import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to={ROUTES.PUBLIC.AUTH} />;

  if (!allowedRoles.includes(user!.role)) {
    return <Navigate to={ROUTES.PUBLIC.UNAUTHORIZED} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
