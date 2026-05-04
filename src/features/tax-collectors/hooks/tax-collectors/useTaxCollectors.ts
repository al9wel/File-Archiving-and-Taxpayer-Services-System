import { useQuery } from "@tanstack/react-query";
import { taxCollectorsApi } from "../../api/taxCollectorsApi";

export const useTaxCollectors = () => {
    return useQuery({
        queryKey: ["tax-collectors"],
        queryFn: async () => taxCollectorsApi.getTaxCollectors(),
    });
};
