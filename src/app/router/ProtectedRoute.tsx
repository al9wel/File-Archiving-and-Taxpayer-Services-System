import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { user } = useAuth();
  const token = localStorage.getItem('access_token');

  // Wait if we have a token but user hasn't loaded yet (page refresh)
  if (!user && token) return null;

  if (!user) return <Navigate to="/auth" />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // Or explicit 403 page
  }

  return <Outlet />;
}

export default ProtectedRoute;
