import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../api/userApi"
import type { UpdateUserParams } from "@/types/User"

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, data }: { id: string | number; data: UpdateUserParams }) => {
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