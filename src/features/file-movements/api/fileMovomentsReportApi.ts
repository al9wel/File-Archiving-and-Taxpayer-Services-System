import { fetchClient } from "@/lib/fetchClient";
import type { Report } from '@/types/Report';

export const fileMovementsReportApi = {

    getFilesMovementsReports: (): Promise<{ data: Report; message: string }> => {
        return fetchClient(`/files-movements/report`, {
            method: 'GET',
        })
    },
}