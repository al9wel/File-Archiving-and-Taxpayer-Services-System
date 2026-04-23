import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export const useCreateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: FormData) => {
            const res = await userApi.createUser(data)
            return res.data
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            })
        },
    })
}