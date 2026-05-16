import { fetchClient } from "@/lib/fetchClient";
import type { FileStatus } from "@/types/FileStatus";

/**
 * API services for fetching basic information about file statuses.
 */
export const fileStatusApi = {
    getFileStatuses: (): Promise<{ data: FileStatus[]; message: string }> => {
        return fetchClient('/file-status', {
            method: 'GET',
        });
    },

    getFileStatus: (id: string | number): Promise<{ data: FileStatus; message: string }> => {
        return fetchClient(`/file-status/${id}`, {
            method: 'GET',
        });
    },

    createFileStatus: (data: FormData): Promise<{ data: FileStatus; message: string }> => {
        return fetchClient('/file-status', {
            method: 'POST',
            body: data,
        });
    },

    updateFileStatus: (id: string | number, data: FormData): Promise<{ data: FileStatus; message: string }> => {
        return fetchClient(`/file-status/${id}`, {
            method: 'PUT',
            body: data,
        });
    },

    deleteFileStatus: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/file-status/${id}`, {
            method: 'DELETE',
        });
    },
};
