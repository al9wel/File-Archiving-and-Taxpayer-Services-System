import { useMutation } from '@tanstack/react-query';
import { forgotPasswordApi } from '../api/forgotPasswordApi';
import type { ResetPassword } from '@/types/ForgotPassword';
import { toast } from 'sonner';

export const useResetForgotPassword = () => {
    return useMutation<ResetPassword, Error, { userId: string | number; code: string | number; newPassword: string; newPassword_confirmation: string }>({
        mutationFn: (data) => forgotPasswordApi.resetPassword(data),
        onSuccess: (data) => {
            toast.success(data.data?.message || 'تم إعادة تعيين كلمة المرور بنجاح');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'فشل في إعادة تعيين كلمة المرور');
        }
    });
};
