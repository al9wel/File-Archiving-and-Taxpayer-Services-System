import { fetchClient } from '@/lib/fetchClient'
import type { OperationReport } from '@/types/OperationReport'

/**
 * API services for Operation Reports (Activity Logs).
 * Provides read-only access to system activity logs.
 */
export const operationReportsApi = {
    getOperationReports: (): Promise<{ data: OperationReport[]; message: string }> => {
        return fetchClient('/activity-log', {
            method: 'GET',
        })
    },
}
