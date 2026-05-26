import { useQuery } from "@tanstack/react-query";
import { requestsApi } from "../api/requestsApi";

export const useConfirmedRequests = () => {
    return useQuery({
        queryKey: ["requests", "confirmed"],
        queryFn: async () => requestsApi.getConfirmedRequests(),
    });
};
