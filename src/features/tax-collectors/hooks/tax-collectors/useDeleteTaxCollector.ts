import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxCollectorsApi } from "../../api/taxCollectorsApi";

export const useDeleteTaxCollector = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | number) => taxCollectorsApi.deleteTaxCollector(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tax-collectors"],
            });
        },
    });
};
