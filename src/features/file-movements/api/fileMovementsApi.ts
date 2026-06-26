import { fetchClient } from '@/lib/fetchClient'
import type { FileMovement, FileMovmentStore } from '@/types/FileMovments'

/**
 * API services for File Movements Management (CRUD operations).
 * Handles multipart/form-data for file uploads and standard updates.
 */
export const fileMovementsApi = {
    /**
     * Creates a new file movement.
     * @param data - FormData containing file movement details.
     */
    createFileMovement: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/files-movements`, {
            method: 'POST',
            body: data,
        })
    },

    /**
     * Fetches the list of all file movements.
     */
    getFileMovements: (): Promise<{ data: FileMovmentStore; message: string }> => {
        return fetchClient(`/files-movements`, {
            method: 'GET',
        })
    },

    /**
     * Fetches detailed information for a specific file movement.
     * @param id - The unique identifier of the file movement.
     */
    getFileMovement: (id: string | number): Promise<{ data: FileMovement; message: string }> => {
        return fetchClient(`/files-movements/${id}`, {
            method: 'GET',
        })
    },

    /**
     * Updates an existing file movement's data.
     * @param id - The unique identifier of the file movement to update.
     * @param data - FormData containing updated fields.
     */
    updateFileMovement: (id: string | number, data: FormData): Promise<{ data: FileMovement; message: string }> => {
        // Appending _method for method spoofing if needed by backend for multipart PUT,
        // although OpenAPI indicates PUT directly. We'll use POST with _method="PUT" to match Laravel patterns often used,
        // but since OpenAPI says PUT, we'll try PUT first unless userApi explicitly did spoofing. 
        // userApi used method: 'POST'.
        data.append("_method", "PUT");
        return fetchClient(`/files-movements/${id}`, {
            method: 'POST',
            body: data,
        })
    },

    /**
     * Permanently deletes a file movement from the system.
     * @param id - The unique identifier of the file movement to delete.
     */
    deleteFileMovement: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/files-movements/${id}`, {
            method: 'DELETE',
        })
    },
}
