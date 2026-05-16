import { useQuery } from "@tanstack/react-query"
import { fileApi } from "../api/fileApi"

export const useFile = (id: string | number) => {
    return useQuery({
        queryKey: ["file", id],
        queryFn: async () => fileApi.getFile(id),
        enabled: !!id,
    })
}
