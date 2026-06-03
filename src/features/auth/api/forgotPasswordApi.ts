import { fetchClient } from '@/lib/fetchClient';
import type { RequestResetPassword, ResetPassword, VerifyCode, ResendCode } from '@/types/ForgotPassword';

export const forgotPasswordApi = {
    requestResetPassword: (data: RequestResetPassword): Promise<ResendCode> => {
        return fetchClient('/request', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    verifyCode: (data: { userId: string | number; code: string | number }): Promise<VerifyCode> => {
        return fetchClient('/verify', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    resetPassword: (data: { userId: string | number; code: string | number; newPassword: string; newPassword_confirmation: string }): Promise<ResetPassword> => {
        return fetchClient('/reset', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    resendCode: (data: { userName: string }): Promise<ResendCode> => {
        return fetchClient('/resend', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
};
