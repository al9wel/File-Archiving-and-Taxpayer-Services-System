import { useQuery } from "@tanstack/react-query"
import { notificationsApi } from "../api/notificationsApi"

export const useNotifications = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: async () => notificationsApi.getNotifications(),
    })
}
