import { useQuery } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export const useSearchUsers = (searchQuery: string) => {
    return useQuery({
        queryKey: ["users", searchQuery],

        queryFn: async () => userApi.getUsers(searchQuery),
    })
}