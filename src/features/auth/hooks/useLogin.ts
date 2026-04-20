import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import type { LoginParams } from '@/types';
import { useAuthStore } from '@/app/store/authStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginParams) => authApi.login(data),
    onSuccess: (response) => {
      // 1. Save token
      localStorage.setItem('access_token', response.data.access_token);

      // 2. Save user ID for future user fetching on refresh
      if (response.data.user?.id) {
        localStorage.setItem('user_id', response.data.user.id.toString());
      }

      // 3. Update global Zustand auth store
      setUser(response.data.user);

      // 4. Redirect to Dashboard
      navigate(ROUTES.DASHBOARD.MAIN);
    },
  });
};
