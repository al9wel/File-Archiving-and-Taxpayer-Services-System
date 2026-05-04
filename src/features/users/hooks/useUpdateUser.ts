import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, data }: { id: string | number; data: FormData }) => userApi.updateUser(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            })
        },
    })
}