import { useQuery } from "@tanstack/react-query"
import { authApi } from "../api/authApi"
import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"
import { getAccessToken, getUserId } from "@/lib/authStorage"

export const useUser = () => {
    const { user, setUser, logout } = useAuth();
    const token = getAccessToken()
    const userId = getUserId()

    const query = useQuery({
        queryKey: ["auth-me", userId],
        queryFn: async () => authApi.getUser(userId!),
        // Only fetch if we have a session but NO user in Zustand yet
        enabled: !!token && !!userId && !user,
        retry: false,
    })

    useEffect(() => {
        if (query.isSuccess) setUser(query.data.data);
        if (query.isError) logout();
        if (!token || !userId) setUser(null);
    }, [query.isSuccess, query.isError, query.isLoading, query.data, token, userId, setUser, logout]);

    return query
}
