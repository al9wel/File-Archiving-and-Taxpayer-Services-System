import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export const useDeleteUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string | number) => userApi.deleteUser(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            })
        },
    })
}