import { useQuery } from "@tanstack/react-query"
import { notificationsApi } from "../api/notificationsApi"

export const useNotification = (id: string | number) => {
    return useQuery({
        queryKey: ["notification", id],
        queryFn: async () => notificationsApi.getNotification(id),
        enabled: !!id,
    })
}
