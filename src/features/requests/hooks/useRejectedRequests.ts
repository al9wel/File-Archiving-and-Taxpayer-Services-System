import { useQuery } from "@tanstack/react-query";
import { requestsApi } from "../api/requestsApi";

export const useRejectedRequests = () => {
    return useQuery({
        queryKey: ["requests", "rejected"],
        queryFn: async () => requestsApi.getRejectedRequests(),
    });
};
