import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import type { LoginParams } from '@/types';
import { useAuthStore } from '@/app/store/authStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setNeedsPasswordReset = useAuthStore((state) => state.setNeedsPasswordReset);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginParams) => authApi.login(data),
    onSuccess: (response) => {
      // 1. Save token
      localStorage.setItem('access_token', response.data.access_token);

      // 2. Handle mandatory password change
      if (response.data.must_change_password) {
        setNeedsPasswordReset(true);
        setUser(null);
        navigate(ROUTES.PUBLIC.RESET_PASSWORD);
        return;
      }

      // 3. Normal login flow
      setNeedsPasswordReset(false);
      
      // Save user ID for future user fetching on refresh
      if (response.data.user?.id) {
        localStorage.setItem('user_id', response.data.user.id.toString());
      }

      // Update global Zustand auth store
      setUser(response.data.user);

      // Redirect to Dashboard
      navigate(ROUTES.DASHBOARD.MAIN);
    },
  });
};
