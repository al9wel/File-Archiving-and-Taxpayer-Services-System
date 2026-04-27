import { useQuery } from "@tanstack/react-query";
import { regionsApi } from "../../api/regionsApi";

export const useRegions = () => {
    return useQuery({
        queryKey: ["regions"],
        queryFn: async () => {
            const res = await regionsApi.getRegions();
            return res.data;
        },
    });
};
