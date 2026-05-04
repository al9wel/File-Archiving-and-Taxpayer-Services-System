import { useQuery } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],

        queryFn: async () => userApi.getUsers(),
    })
}