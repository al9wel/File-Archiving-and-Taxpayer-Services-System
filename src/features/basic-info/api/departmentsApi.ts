import { fetchClient } from "@/lib/fetchClient";
import type { Department } from "@/types/Department";

/**
 * API services for fetching basic information about departments.
 */
export const departmentsApi = {
    /**
     * Fetches all available departments from the backend.
     * @returns A promise with the department list data and a success message.
     */
    getDepartments: (): Promise<{ data: Department[], message: string }> => {
        return fetchClient("/departments", {
            method: "GET",
        });
    },
};
