import { useQuery } from "@tanstack/react-query"
import { fileMovementsApi } from "../api/fileMovementsApi"

export const useFileMovement = (id: string | number) => {
    return useQuery({
        queryKey: ["file-movements", id],
        queryFn: async () => fileMovementsApi.getFileMovement(id),
        enabled: !!id,
    })
}
