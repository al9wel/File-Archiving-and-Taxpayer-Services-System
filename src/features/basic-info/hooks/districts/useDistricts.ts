import { useQuery } from "@tanstack/react-query";
import { districtsApi } from "../../api/districtsApi";

export const useDistricts = () => {
    return useQuery({
        queryKey: ["districts"],
        queryFn: async () => districtsApi.getDistricts(),
    });
};
