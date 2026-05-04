import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '@/app/store/authStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const useLogout = () => {
  const logoutState = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => authApi.logout(),
    onSuccess: () => {
      // Clean up storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');

      // Clean up Zustand store
      logoutState();

      // Redirect
      navigate(ROUTES.PUBLIC.AUTH);
    },
    onError: () => {
      // Even if API fails, we should clear everything locally
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      logoutState();
      navigate(ROUTES.PUBLIC.AUTH);
    }
  });
};
