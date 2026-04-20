import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '@/app/store/authStore';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const logoutState = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clean up storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      
      // Clean up Zustand store
      logoutState();
      
      // Redirect
      navigate('/auth');
    },
    onError: () => {
      // Even if API fails, we should clear everything locally
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      logoutState();
      navigate('/auth');
    }
  });
};
