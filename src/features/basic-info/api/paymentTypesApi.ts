import { fetchClient } from "@/lib/fetchClient";
import type { PaymentType } from "@/types/PaymentType";

/**
 * API services for payment types.
 */
export const paymentTypesApi = {
    getPaymentTypes: (): Promise<{ data: PaymentType[]; message: string }> => {
        return fetchClient('/payment_types', {
            method: 'GET',
        });
    },

    getPaymentType: (id: string | number): Promise<{ data: PaymentType; message: string }> => {
        return fetchClient(`/payment_types/${id}`, {
            method: 'GET',
        });
    },

    createPaymentType: (data: FormData): Promise<{ data: PaymentType; message: string }> => {
        return fetchClient('/payment_types', {
            method: 'POST',
            body: data,
        });
    },

    updatePaymentType: (id: string | number, data: FormData): Promise<{ data: PaymentType; message: string }> => {
        return fetchClient(`/payment_types/${id}`, {
            method: 'PUT',
            body: data,
        });
    },

    deletePaymentType: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/payment_types/${id}`, {
            method: 'DELETE',
        });
    },
};
