import { useMutation } from '@tanstack/react-query';
import { forgotPasswordApi } from '../api/forgotPasswordApi';
import type { RequestResetPassword, ResendCode } from '@/types/ForgotPassword';
import { toast } from 'sonner';

export const useForgotPassword = () => {
    return useMutation<ResendCode, Error, RequestResetPassword>({
        mutationFn: (data: RequestResetPassword) => forgotPasswordApi.requestResetPassword(data),
        onSuccess: (data) => {
            toast.success(data.data?.message || 'تم إرسال رمز التحقق بنجاح');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'فشل في إرسال طلب استعادة كلمة المرور');
        }
    });
};
