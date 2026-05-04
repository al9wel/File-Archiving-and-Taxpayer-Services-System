import { useQuery } from "@tanstack/react-query";
import { basicInfoApi } from "../../api/basicInfoApi";

export const useBasicInfoStats = () => {
    return useQuery({
        queryKey: ["basicInfoStats"],
        queryFn: async () => basicInfoApi.getBasicInfoStats(),
    });
}