import { useAuth } from './useAuth';
import { PERMISSIONS } from '@/constants/permissions';

export function usePermission(permission: keyof typeof PERMISSIONS): boolean {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) return false

  return PERMISSIONS[permission]?.includes(user.role as any)
}
