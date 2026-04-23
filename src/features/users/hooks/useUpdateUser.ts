import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, data }: { id: string | number; data: FormData }) => {
            const res = await userApi.updateUser(id, data)
            return res.data
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            })
        },
    })
}