import { fetchClient } from "@/lib/fetchClient";
import type { District } from "@/types/District";

/**
 * API services for districts.
 */
export const districtsApi = {
    getDistricts: (): Promise<{ data: District[]; message: string }> => {
        return fetchClient('/districts', {
            method: 'GET',
        });
    },

    getDistrict: (id: string | number): Promise<{ data: District; message: string }> => {
        return fetchClient(`/districts/${id}`, {
            method: 'GET',
        });
    },

    createDistrict: (data: FormData): Promise<{ data: District; message: string }> => {
        return fetchClient('/districts', {
            method: 'POST',
            body: data,
        });
    },

    updateDistrict: (id: string | number, data: FormData): Promise<{ data: District; message: string }> => {
        return fetchClient(`/districts/${id}`, {
            method: 'PUT',
            body: data,
        });
    },

    deleteDistrict: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/districts/${id}`, {
            method: 'DELETE',
        });
    },
};
