import { useQuery } from "@tanstack/react-query";
import { requestsApi } from "../api/requestsApi";

export const useArchivedRequests = () => {
    return useQuery({
        queryKey: ["requests", "archived"],
        queryFn: async () => requestsApi.getArchivedRequests(),
    });
};
