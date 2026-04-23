import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { user, needsPasswordReset } = useAuth();
  const token = localStorage.getItem('access_token');

  // 1. Not logged in at all
  if (!token) return <Navigate to={ROUTES.PUBLIC.AUTH} />;

  // 2. Forced password reset flow
  if (needsPasswordReset && !user) {
    return <Navigate to={ROUTES.PUBLIC.RESET_PASSWORD} replace />;
  }

  // 3. Logged in but profile not loaded yet (refreshing)
  if (!user) {
    return null; // Or a global loader
  }

  // 4. Role check
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.PUBLIC.UNAUTHORIZED} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
