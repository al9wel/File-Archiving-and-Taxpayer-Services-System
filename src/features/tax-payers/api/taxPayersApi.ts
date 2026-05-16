import { fetchClient } from '@/lib/fetchClient'
import type { TaxPayers } from '@/types/TaxPayers';

export const taxPayersApi = {
    getTaxPayers: (): Promise<{ data: TaxPayers[]; message: string }> => {
        return fetchClient('/get-tax-payers-with-special-info', {
            method: 'GET',
        })
    },
}
