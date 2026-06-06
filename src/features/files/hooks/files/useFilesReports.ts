import { useQuery } from "@tanstack/react-query"
import { fileReportApi } from "../../api/fileReportApi"

export const useFilesReports = () => {
    return useQuery({
        queryKey: ["files", "reports"],
        queryFn: async () => fileReportApi.getFilesReports(),
        enabled: false,
        retry: false,
    })
}
