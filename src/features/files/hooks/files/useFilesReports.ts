import { useMutation } from "@tanstack/react-query"
import { fileReportApi } from "../../api/fileReportApi"

export const useFilesReports = () => {
    return useMutation({
        mutationFn: () => fileReportApi.getFilesReports(),
    })
}
