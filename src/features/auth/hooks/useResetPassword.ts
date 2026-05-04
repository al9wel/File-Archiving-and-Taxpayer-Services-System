import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { toast } from 'sonner';

export const useResetPassword = () => {
  const { setUser, setNeedsPasswordReset } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { new_password: string; new_password_confirmation: string }) =>
      authApi.resetPassword(data),
    onSuccess: async () => {


      // Clear reset flag
      setNeedsPasswordReset(false);

      // Now fetch user to get full profile
      // The user session is already active via token
      try {
        const userId = localStorage.getItem('user_id');
        if (userId) {
          const userResponse = await authApi.getUser(userId);
          setUser(userResponse.data);
          navigate(ROUTES.DASHBOARD.MAIN);
        } else {
          // Fallback if userId not found
          navigate(ROUTES.PUBLIC.AUTH);
        }
      } catch (error) {
        toast.error('حدث خطأ أثناء تحميل بيانات المستخدم');
        navigate(ROUTES.PUBLIC.AUTH);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'فشل تغيير كلمة المرور');
    }
  });
};
