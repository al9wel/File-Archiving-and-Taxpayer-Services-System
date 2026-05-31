import { useQuery } from "@tanstack/react-query";
import { districtsApi } from "../../api/districtsApi";

export const useDistrictsByRegion = (regionId: string | number) => {
    return useQuery({
        queryKey: ["districts", regionId],
        queryFn: async () => districtsApi.getDistrictsByRegion(regionId),
    });
};
