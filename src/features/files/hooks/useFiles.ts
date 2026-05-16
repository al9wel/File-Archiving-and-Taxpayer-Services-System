import { useQuery } from "@tanstack/react-query"
import { fileApi } from "../api/fileApi"

export const useFiles = () => {
    return useQuery({
        queryKey: ["files"],

        queryFn: async () => fileApi.getFiles(),
    })
}
