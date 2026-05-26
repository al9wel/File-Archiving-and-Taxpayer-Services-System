import { useQuery } from "@tanstack/react-query"
import { fileMovementsApi } from "../api/fileMovementsApi"

export const useFileMovements = () => {
    return useQuery({
        queryKey: ["file-movements"],
        queryFn: async () => fileMovementsApi.getFileMovements(),
    })
}
