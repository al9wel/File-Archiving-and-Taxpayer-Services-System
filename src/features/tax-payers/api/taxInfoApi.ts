import { fetchClient } from '@/lib/fetchClient'
import type { TaxInfo } from '@/types/TaxInfo'

export const taxInfoApi = {
    createTaxInfo: (data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/tax-informations`, {
            method: 'POST',
            body: data,
        })
    },

    getTaxInfos: (): Promise<{ data: TaxInfo[]; message: string }> => {
        return fetchClient('/tax-informations', {
            method: 'GET',
        })
    },

    getTaxInfo: (id: string | number): Promise<{ data: TaxInfo; message: string }> => {
        return fetchClient(`/tax-informations/${id}`, {
            method: 'GET',
        })
    },

    updateTaxInfo: (id: string | number, data: FormData): Promise<{ data: any; message: string }> => {
        return fetchClient(`/tax-informations/${id}`, {
            method: 'PUT',
            body: data,
        })
    },

    deleteTaxInfo: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/tax-informations/${id}`, {
            method: 'DELETE',
        })
    },


}
