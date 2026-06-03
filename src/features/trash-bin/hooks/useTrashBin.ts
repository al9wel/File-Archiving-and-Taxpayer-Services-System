import { useQuery } from "@tanstack/react-query"
import { trashBinApi } from "../api/trashBinApi"

export const useTrashBin = () => {
    return useQuery({
        queryKey: ["trash-bin"],
        queryFn: async () => trashBinApi.getTrashItems(),
    })
}
