import { useAuthStore } from '@/app/store/authStore';

export const useAuth = () => {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const needsPasswordReset = useAuthStore(state => state.needsPasswordReset);
  const setUser = useAuthStore(state => state.setUser);
  const setNeedsPasswordReset = useAuthStore(state => state.setNeedsPasswordReset);
  const logout = useAuthStore(state => state.logout);

  return {
    user,
    isAuthenticated,
    needsPasswordReset,
    setUser,
    setNeedsPasswordReset,
    logout,
  };
};