import { useQuery } from "@tanstack/react-query";
import { requestsApi } from "../api/requestsApi";

export const usePendingRequests = () => {
    return useQuery({
        queryKey: ["requests", "pending"],
        queryFn: async () => requestsApi.getPendingRequests(),
    });
};
