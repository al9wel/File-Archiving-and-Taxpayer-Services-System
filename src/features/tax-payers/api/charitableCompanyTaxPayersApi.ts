import { fetchClient } from '@/lib/fetchClient'
import type { CharitableCompanyTaxPayer } from '@/types/CharitableCompanyTaxPayer'

export const charitableCompanyTaxPayersApi = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createTaxPayer: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/charitable-companies`, {
            method: 'POST',
            body: data,
        })
    },

    getTaxPayers: (): Promise<{ data: CharitableCompanyTaxPayer[]; message: string }> => {
        return fetchClient('/charitable-companies', {
            method: 'GET',
        })
    },

    getTaxPayer: (id: string | number): Promise<{ data: CharitableCompanyTaxPayer; message: string }> => {
        return fetchClient(`/charitable-companies/${id}`, {
            method: 'GET',
        })
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateTaxPayer: (id: string | number, data: FormData): Promise<{ data: any; message: string }> => {
        data.append("_method", "PUT");
        return fetchClient(`/charitable-companies/${id}`, {
            method: 'POST',
            body: data,
        })
    },

    deleteTaxPayer: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/charitable-companies/${id}`, {
            method: 'DELETE',
        })
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createTaxPayerExisting: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/charitable-companies/create-file-to-existing`, {
            method: 'POST',
            body: data,
        })
    },
}
