import { fetchClient } from "@/lib/fetchClient";
import type { Request } from "@/types/Requests";

/**
 * API services for requests incoming from the mobile application.
 */
export const requestsApi = {
    getPendingRequests: (): Promise<{ data: Request[]; message: string }> => {
        return fetchClient('/get-pending-requests', {
            method: 'GET',
        });
    },

    getConfirmedRequests: (): Promise<{ data: Request[]; message: string }> => {
        return fetchClient('/get-confirmed-requests', {
            method: 'GET',
        });
    },

    getArchivedRequests: (): Promise<{ data: Request[]; message: string }> => {
        return fetchClient('/get-archived-requests', {
            method: 'GET',
        });
    },

    getRejectedRequests: (): Promise<{ data: Request[]; message: string }> => {
        return fetchClient('/get-rejected-requests', {
            method: 'GET',
        });
    },

    getRequestById: (id: string | number): Promise<{ data: Request; message: string }> => {
        return fetchClient(`/requests/${id}`, {
            method: 'GET',
        });
    },

    approveRequest: (requestId: string | number): Promise<{ message: string }> => {
        const formData = new FormData();
        formData.append("requestId", String(requestId));
        formData.append("_method", "PUT");
        return fetchClient('/accept-request', {
            method: 'POST',
            body: formData,
        });
    },

    rejectRequest: (requestId: string | number, note: string | number): Promise<{ message: string }> => {
        const formData = new FormData();
        formData.append("requestId", String(requestId));
        formData.append("note", String(note));
        formData.append("_method", "PUT");
        return fetchClient('/reject-request', {
            method: 'POST',
            body: formData,
        });
    },
};
