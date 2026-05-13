import { fetchClient } from '@/lib/fetchClient'
import type { IndividualTaxPayer } from '@/types/IndividualTaxPayer'

export const individualTaxPayersApi = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createTaxPayer: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/tax-payers`, {
            method: 'POST',
            body: data,
        })
    },

    getTaxPayers: (): Promise<{ data: IndividualTaxPayer[]; message: string }> => {
        return fetchClient('/tax-payers', {
            method: 'GET',
        })
    },

    getTaxPayer: (id: string | number): Promise<{ data: IndividualTaxPayer; message: string }> => {
        return fetchClient(`/tax-payers/${id}`, {
            method: 'GET',
        })
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateTaxPayer: (id: string | number, data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/tax-payers/${id}`, {
            method: 'PUT',
            body: data,
        })
    },

    deleteTaxPayer: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/tax-payers/${id}`, {
            method: 'DELETE',
        })
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createTaxPayerExisting: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/tax-payers/create-file-to-existing`, {
            method: 'POST',
            body: data,
        })
    },
}
