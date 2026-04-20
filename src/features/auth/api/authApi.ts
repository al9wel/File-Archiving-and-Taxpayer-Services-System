import { fetchClient } from '@/lib/fetchClient';
import type { User, LoginParams, LoginResponse } from '@/types';

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
    getUser: (id: string | number): Promise<{ success: boolean; data: User }> => {
        return fetchClient(`/app_users/${id}`, {
            method: 'GET',
        });
    }
};
