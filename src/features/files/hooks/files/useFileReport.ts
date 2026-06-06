import { useQuery } from "@tanstack/react-query"
import { fileReportApi } from "../../api/fileReportApi"

export const useFileReport = (id: string | number) => {
    return useQuery({
        queryKey: ["files", "report", id],
        queryFn: async () => fileReportApi.getFileReport(id),
        enabled: false,
        retry: false,
    })
}
