import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '@/lib/authStorage';
import { useUser } from '@/features/auth/hooks/useUser';
import ErrorState from '../pages/ErrorState';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { isLoading, isError } = useUser()
  const { user, needsPasswordReset } = useAuth();

  if (isError) {
    return <ErrorState />;
  }
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col h-screen w-full items-center justify-center bg-background/50 backdrop-blur-sm animate-in fade-in duration-500 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium animate-pulse">جاري التحقق من المستخدم...</p>
      </div>
    )
  }
  const token = getAccessToken();

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
    return <Navigate to={ROUTES.PUBLIC.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
