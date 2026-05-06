import { fetchClient } from '@/lib/fetchClient'
import type { TaxType } from '@/types/TaxType'

export const taxTypesApi = {
    createTaxType: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/tax-types`, {
            method: 'POST',
            body: data,
        })
    },

    getTaxTypes: (): Promise<{ data: TaxType[]; message: string }> => {
        return fetchClient('/tax-types', {
            method: 'GET',
        })
    },

    getTaxType: (id: string | number): Promise<{ data: TaxType; message: string }> => {
        return fetchClient(`/tax-types/${id}`, {
            method: 'GET',
        })
    },

    updateTaxType: (id: string | number, data: FormData): Promise<{ data: TaxType; message: string }> => {
        return fetchClient(`/tax-types/${id}`, {
            method: 'PUT',
            body: data,
        })
    },

    deleteTaxType: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/tax-types/${id}`, {
            method: 'DELETE',
        })
    },
}
