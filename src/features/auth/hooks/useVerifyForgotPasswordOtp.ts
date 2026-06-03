import { useMutation } from '@tanstack/react-query';
import { forgotPasswordApi } from '../api/forgotPasswordApi';
import type { VerifyCode } from '@/types/ForgotPassword';
import { toast } from 'sonner';

export const useVerifyForgotPasswordOtp = () => {
    return useMutation<VerifyCode, Error, { userId: string | number; code: string | number }>({
        mutationFn: (data) => forgotPasswordApi.verifyCode(data),
        onSuccess: (data) => {
            toast.success(data.data?.message || 'تم التحقق من الرمز بنجاح');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'الرمز غير صحيح أو منتهي الصلاحية');
        }
    });
};
