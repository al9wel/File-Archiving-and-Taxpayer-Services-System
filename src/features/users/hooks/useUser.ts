import { useQuery } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export const useUser = (id: string | number) => {
    return useQuery({
        queryKey: ["user", id],

        queryFn: async () => {
            const res = await userApi.getUser(id)
            return res.data
        },

        enabled: !!id,
    })
}