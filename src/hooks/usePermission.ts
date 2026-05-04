import { useAuth } from './useAuth';
import { PERMISSIONS } from '@/constants/permissions';

export function usePermission(action: string): boolean {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) return false

  return PERMISSIONS[action]?.includes(user.role) ?? false
}
