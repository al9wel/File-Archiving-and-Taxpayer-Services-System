import { fetchClient } from '@/lib/fetchClient'
import type { Attachment } from '@/types/Attachment'

export const attachmentApi = {
    createAttachment: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/attachment`, {
            method: 'POST',
            body: data,
        })
    },

    getAttachments: (): Promise<{ data: Attachment[]; message: string }> => {
        return fetchClient('/attachment', {
            method: 'GET',
        })
    },

    getAttachment: (id: string | number): Promise<{ data: Attachment; message: string }> => {
        return fetchClient(`/attachment/${id}`, {
            method: 'GET',
        })
    },

    updateAttachment: (id: string | number, data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/attachment/${id}`, {
            method: 'PUT',
            body: data,
        })
    },

    deleteAttachment: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/attachment/${id}`, {
            method: 'DELETE',
        })
    },
}