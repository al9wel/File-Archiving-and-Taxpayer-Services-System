import { fetchClient } from '@/lib/fetchClient'
import type { Report } from '@/types/Report';


export const fileReportApi = {

    getFilesReports: (): Promise<{ data: Report; message: string }> => {
        return fetchClient(`/files/report`, {
            method: 'GET',
        })
    },
    getFileReport: (id: string | number): Promise<{ data: Report; message: string }> => {
        return fetchClient(`/files/${id}/report`, {
            method: 'GET',
        })
    },
}
