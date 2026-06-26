import { fetchClient } from '@/lib/fetchClient'
import type { NotifiacationStore, Notification } from '@/types/Notification'

export const notificationsApi = {
    createNotification: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/notification`, {
            method: 'POST',
            body: data,
        })
    },

    getNotifications: (): Promise<{ data: NotifiacationStore; message: string }> => {
        return fetchClient(`/notification`, {
            method: 'GET',
        })
    },

    getNotification: (id: string | number): Promise<{ data: Notification; message: string }> => {
        return fetchClient(`/notification/${id}`, {
            method: 'GET',
        })
    },

    updateNotification: (id: string | number, data: FormData): Promise<{ data: Notification; message: string }> => {
        // Using PUT for update as per OpenAPI spec. 
        // If Laravel requires method spoofing with POST and _method="PUT", we can adjust if it fails.
        data.append("_method", "PUT");
        return fetchClient(`/notification/${id}`, {
            method: 'POST',
            body: data,
        })
    },

    deleteNotification: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/notification/${id}`, {
            method: 'DELETE',
        })
    },
}
