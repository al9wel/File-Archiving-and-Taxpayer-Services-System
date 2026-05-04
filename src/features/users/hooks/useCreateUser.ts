import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export const useCreateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: FormData) => userApi.createUser(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            })
        },
    })
}