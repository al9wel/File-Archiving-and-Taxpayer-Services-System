import { fetchClient } from '@/lib/fetchClient'
import type { CompanyTaxPayer } from '@/types/CompanyTaxPayer'

export const companyTaxPayersApi = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createTaxPayer: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/companies`, {
            method: 'POST',
            body: data,
        })
    },

    getTaxPayers: (): Promise<{ data: CompanyTaxPayer[]; message: string }> => {
        return fetchClient('/companies', {
            method: 'GET',
        })
    },

    getTaxPayer: (id: string | number): Promise<{ data: CompanyTaxPayer; message: string }> => {
        return fetchClient(`/companies/${id}`, {
            method: 'GET',
        })
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateTaxPayer: (id: string | number, data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/companies/${id}`, {
            method: 'PUT',
            body: data,
        })
    },

    deleteTaxPayer: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/companies/${id}`, {
            method: 'DELETE',
        })
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createTaxPayerExisting: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/companies/create-file-to-existing`, {
            method: 'POST',
            body: data,
        })
    },
}
