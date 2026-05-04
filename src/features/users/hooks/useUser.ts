import { useQuery } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export const useUser = (id: string | number) => {
    return useQuery({
        queryKey: ["user", id],

        queryFn: async () => userApi.getUser(id),

        enabled: !!id,
    })
}