import { useQuery } from "@tanstack/react-query";
import { requestsApi } from "../api/requestsApi";

export const useRequestDetails = (id: string | number) => {
    return useQuery({
        queryKey: ["requests", "details", id],
        queryFn: async () => requestsApi.getRequestById(id),
        enabled: !!id,
    });
};
