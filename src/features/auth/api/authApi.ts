import { fetchClient } from '@/lib/fetchClient';
import type { LoginParams, LoginResponse } from '@/types';
import type { User } from '@/types/User';


export const authApi = {
    login: (data: LoginParams): Promise<LoginResponse> => {
        return fetchClient('/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    logout: () => {
        return fetchClient('/logout', {
            method: 'POST',
        });
    },

    // Added based on user feedback to fetch user using ID. 
    // Wait, wait... the endpoint in apiResource ('app_users') would be '/app_users/{id}'.
    getUser: (id: string | number): Promise<{ data: User; message: string }> => {
        return fetchClient(`/get_user/${id}`, {
            method: 'GET',
        });
    },

    resetPassword: (data: { new_password: string; new_password_confirmation: string }) => {
        return fetchClient('/reset-password', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
};
