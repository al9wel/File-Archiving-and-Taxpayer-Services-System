import { useQuery } from "@tanstack/react-query"
import { operationReportsApi } from "../api/operationReportsApi"

/**
 * Hook to fetch all operation reports "activity logs".
 */
export const useOperationReports = () => {
    return useQuery({
        queryKey: ["operation-reports"],
        queryFn: async () => operationReportsApi.getOperationReports(),
    })
}
