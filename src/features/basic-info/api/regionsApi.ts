import { fetchClient } from "@/lib/fetchClient";
import type { Region } from "@/types/Region";

/**
 * API services for regions.
 */
export const regionsApi = {
    getRegions: (): Promise<{ data: Region[]; message: string }> => {
        return fetchClient('/regions', {
            method: 'GET',
        });
    },

    getRegion: (id: string | number): Promise<{ data: Region; message: string }> => {
        return fetchClient(`/regions/${id}`, {
            method: 'GET',
        });
    },

    createRegion: (data: FormData): Promise<{ data: Region; message: string }> => {
        return fetchClient('/regions', {
            method: 'POST',
            body: data,
        });
    },

    updateRegion: (id: string | number, data: FormData): Promise<{ data: Region; message: string }> => {
        return fetchClient(`/regions/${id}`, {
            method: 'PUT',
            body: data,
        });
    },

    deleteRegion: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/regions/${id}`, {
            method: 'DELETE',
        });
    },
};
