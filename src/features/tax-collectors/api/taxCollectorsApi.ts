import { fetchClient } from "@/lib/fetchClient";
import type { TaxCollector } from "@/types";

export const taxCollectorsApi = {
    getTaxCollectors: (): Promise<{ data: TaxCollector[]; message: string }> => {
        return fetchClient('/tax-collectors', {
            method: 'GET',
        });
    },

    getTaxCollector: (id: string | number): Promise<{ data: TaxCollector; message: string }> => {
        return fetchClient(`/tax-collectors/${id}`, {
            method: 'GET',
        });
    },

    createTaxCollector: (data: FormData): Promise<{ data: TaxCollector; message: string }> => {
        return fetchClient('/tax-collectors', {
            method: 'POST',
            body: data,
        });
    },

    updateTaxCollector: (id: string | number, data: FormData): Promise<{ data: TaxCollector; message: string }> => {
        return fetchClient(`/tax-collectors/${id}`, {
            method: 'PUT',
            body: data,
        });
    },

    deleteTaxCollector: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/tax-collectors/${id}`, {
            method: 'DELETE',
        });
    },
};
