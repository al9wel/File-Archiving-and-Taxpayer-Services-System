import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxCollectorsApi } from "../../api/taxCollectorsApi";

export const useCreateTaxCollector = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormData) => taxCollectorsApi.createTaxCollector(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tax-collectors"],
            });
        },
    });
};
