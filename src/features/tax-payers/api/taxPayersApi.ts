import { fetchClient } from '@/lib/fetchClient'
import type { AllTaxPayers } from '@/types/AllTaxPayers';

export const taxPayersApi = {
    getAllTaxPayers: (): Promise<{ data: AllTaxPayers[]; message: string }> => {
        return fetchClient('/get-tax-payers-with-special-info', {
            method: 'GET',
        })
    },
}
