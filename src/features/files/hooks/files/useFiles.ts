import { useQuery } from "@tanstack/react-query"
import { fileApi } from "../../api/fileApi"

export const useFiles = (searchQuery = "") => {
    return useQuery({
        queryKey: ["files", searchQuery],
        queryFn: async () => fileApi.getFiles(searchQuery),
    })
}