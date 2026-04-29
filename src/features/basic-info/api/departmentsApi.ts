import { fetchClient } from "@/lib/fetchClient";
import type { Department } from "@/types/Department";

/**
 * API services for fetching basic information about departments.
 */
export const departmentsApi = {
    getDepartments: (): Promise<{ data: Department[]; message: string }> => {
        return fetchClient('/departments', {
            method: 'GET',
        });
    },

    getDepartment: (id: string | number): Promise<{ data: Department; message: string }> => {
        return fetchClient(`/departments/${id}`, {
            method: 'GET',
        });
    },

    createDepartment: (data: FormData): Promise<{ data: Department; message: string }> => {
        return fetchClient('/departments', {
            method: 'POST',
            body: data,
        });
    },

    updateDepartment: (id: string | number, data: FormData): Promise<{ data: Department; message: string }> => {
        // Using PUT as per OpenAPI spec
        return fetchClient(`/departments/${id}`, {
            method: 'PUT',
            body: data,
        });
    },
    deleteDepartment: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/departments/${id}`, {
            method: 'DELETE',
        });
    },
    moveUsersDepartment:(oldDepId: string | number, newDepId: string | number): Promise<{ message: string }> => {
        return fetchClient(`/departments/${oldDepId}/move-users`, {
            method: 'POST',
            body: JSON.stringify({ department_id: newDepId }),
        });
    }
};
