import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationsApi } from "../api/notificationsApi"

export const useUpdateNotification = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, data }: { id: string | number; data: FormData }) => notificationsApi.updateNotification(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            })
        },
    })
}
