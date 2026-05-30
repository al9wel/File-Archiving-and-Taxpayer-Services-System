import { fetchClient } from '@/lib/fetchClient'
import type { File } from '@/types/File'

/**
 * API services for Files Management (CRUD operations).
 */
export const fileApi = {
    /**
     * Creates a new file.
     * @param data - FormData containing file details.
     */
    createFile: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/files`, {
            method: 'POST',
            body: data,
        })
    },

    /**
     * Fetches the list of all files.
     */
    getFiles: (searchQuery = ""): Promise<{ data: File['fileInfo'][]; message: string }> => {
        return fetchClient(`/files?search=${searchQuery}`, {
            method: 'GET',
        })
    },

    /**
     * Fetches detailed information for a specific file.
     * @param id - The unique identifier of the file.
     */
    getFile: (id: string | number): Promise<{ data: File['fileInfo']; message: string }> => {
        return fetchClient(`/files/${id}`, {
            method: 'GET',
        })
    },

    /**
     * Updates an existing file's data.
     * Note: Uses POST with method spoofing (_method: "PUT" inside FormData) 
     * @param id - The unique identifier of the file to update.
     * @param data - FormData containing updated fields.
     */
    updateFile: (id: string | number, data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/files/${id}`, {
            method: 'PUT',
            body: data,
        })
    },

    /**
     * Permanently deletes a file from the system.
     * @param id - The unique identifier of the file to delete.
     */
    deleteFile: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/files/${id}`, {
            method: 'DELETE',
        })
    },
}
