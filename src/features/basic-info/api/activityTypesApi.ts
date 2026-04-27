import { fetchClient } from "@/lib/fetchClient";
import type { ActivityType } from "@/types/ActivityType";

/**
 * API services for activity types.
 */
export const activityTypesApi = {
    getActivityTypes: (): Promise<{ data: ActivityType[]; message: string }> => {
        return fetchClient('/activity_types', {
            method: 'GET',
        });
    },

    getActivityType: (id: string | number): Promise<{ data: ActivityType; message: string }> => {
        return fetchClient(`/activity_types/${id}`, {
            method: 'GET',
        });
    },

    createActivityType: (data: FormData): Promise<{ data: ActivityType; message: string }> => {
        return fetchClient('/activity_types', {
            method: 'POST',
            body: data,
        });
    },

    updateActivityType: (id: string | number, data: FormData): Promise<{ data: ActivityType; message: string }> => {
        return fetchClient(`/activity_types/${id}`, {
            method: 'PUT',
            body: data,
        });
    },

    deleteActivityType: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/activity_types/${id}`, {
            method: 'DELETE',
        });
    },
};
