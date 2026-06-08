import { useMutation } from "@tanstack/react-query"
import { fileReportApi } from "../../api/fileReportApi"

export const useFileReport = () => {
    return useMutation({
        mutationFn: (id: string | number) => fileReportApi.getFileReport(id),
    })
}
