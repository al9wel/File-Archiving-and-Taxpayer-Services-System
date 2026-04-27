import { useQuery } from "@tanstack/react-query";
import { activityTypesApi } from "../../api/activityTypesApi";

export const useActivityTypes = () => {
    return useQuery({
        queryKey: ["activity-types"],
        queryFn: async () => {
            const res = await activityTypesApi.getActivityTypes();
            return res.data;
        },
    });
};
