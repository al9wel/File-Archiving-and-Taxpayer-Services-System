import { useMutation } from "@tanstack/react-query"
import { fileMovementsReportApi } from "../api/fileMovomentsReportApi"

export const useFileMovementsReport = () => {
    return useMutation({
        mutationFn: () => fileMovementsReportApi.getFilesMovementsReports(),
    })
}