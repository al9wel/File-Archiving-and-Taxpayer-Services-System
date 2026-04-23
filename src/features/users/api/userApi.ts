import { fetchClient } from '@/lib/fetchClient'
import type { User } from '@/types/User'



/**
 * API services for User Management (CRUD operations).
 * Handles multipart/form-data for file uploads.
 */
export const userApi = {
    /**
     * Creates a new user with binary file support.
     * @param data - FormData containing user details and files (image, idCard).
     */
    createUser: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/create-user`, {
            method: 'POST',
            body: data,
        })
    },

    /**
     * Fetches the list of all active users.
     */
    getUsers: (): Promise<{ data: User[]; message: string }> => {
        return fetchClient('/app_users', {
            method: 'GET',
        })
    },

    /**
     * Fetches detailed information for a specific user.
     * @param id - The unique identifier of the user.
     */
    getUser: (id: string | number): Promise<{ data: User; message: string }> => {
        return fetchClient(`/app_users/${id}`, {
            method: 'GET',
        })
    },

    /**
     * Updates an existing user's data.
     * Note: Uses POST with method spoofing (_method: "PUT" inside FormData) 
     * to support multipart updates in PHP/Laravel.
     * @param id - The unique identifier of the user to update.
     * @param data - FormData containing updated fields and optional new files.
     */
    updateUser: (id: string | number, data: FormData): Promise<{ data: User; message: string }> => {
        return fetchClient(`/app_users/${id}`, {
            method: 'PUT',
            body: data,
        })
    },

    /**
     * Permanently deletes a user from the system.
     * @param id - The unique identifier of the user to delete.
     */
    deleteUser: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/app_users/${id}`, {
            method: 'DELETE',
        })
    },
}