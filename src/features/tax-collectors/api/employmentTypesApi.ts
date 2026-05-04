import { fetchClient } from "@/lib/fetchClient";
import type { EmploymentType } from "@/types";

export const employmentTypesApi = {
    getEmploymentTypes: (): Promise<{ data: EmploymentType[]; message: string }> => {
        return fetchClient('/job-types', {
            method: 'GET',
        });
    },

    getEmploymentType: (id: string | number): Promise<{ data: EmploymentType; message: string }> => {
        return fetchClient(`/job-types/${id}`, {
            method: 'GET',
        });
    },

    createEmploymentType: (data: FormData): Promise<{ data: EmploymentType; message: string }> => {
        return fetchClient('/job-types', {
            method: 'POST',
            body: data,
        });
    },

    updateEmploymentType: (id: string | number, data: FormData): Promise<{ data: EmploymentType; message: string }> => {
        return fetchClient(`/job-types/${id}`, {
            method: 'PUT',
            body: data,
        });
    },

    deleteEmploymentType: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/job-types/${id}`, {
            method: 'DELETE',
        });
    },
};
