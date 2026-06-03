import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationsApi } from "../api/notificationsApi"

export const useCreateNotification = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: FormData) => notificationsApi.createNotification(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            })
        },
    })
}
