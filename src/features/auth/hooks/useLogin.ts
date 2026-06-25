import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import type { LoginParams } from '@/types';
// import { useAuthStore } from '@/app/store/authStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { saveAccessToken, saveUserId } from '@/lib/authStorage';

export const useLogin = () => {
  const { setUser, setNeedsPasswordReset } = useAuth()
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginParams) => authApi.login(data),
    onSuccess: (response) => {
      // 1. Save token
      saveAccessToken(response.data.access_token);

      // Save user ID for future user fetching on refresh or password reset
      if (response.data.user?.id) {
        saveUserId(response.data.user.id.toString());
      }

      // 2. Handle mandatory password change
      if (response.data.must_change_password) {
        setNeedsPasswordReset(true);
        setUser(null);
        navigate(ROUTES.PUBLIC.RESET_PASSWORD);
        return;
      }

      // 3. Normal login flow
      setNeedsPasswordReset(false);

      // Update global Zustand auth store
      setUser(response.data.user);
      navigate(ROUTES.DASHBOARD.FILE_MOVEMENTS);
    },
  });
};
