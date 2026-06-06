import { useQuery } from "@tanstack/react-query"
import { fileMovementsReportApi } from "../api/fileMovomentsReportApi"

export const useFileMovementsReport = () => {
    return useQuery({
        queryKey: ["file-movements", "reports"],
        queryFn: async () => fileMovementsReportApi.getFilesMovementsReports(),
        enabled: false,
        retry: false,
    })
}
