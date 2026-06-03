import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationsApi } from "../api/notificationsApi"

export const useDeleteNotification = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string | number) => notificationsApi.deleteNotification(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            })
        },
    })
}
