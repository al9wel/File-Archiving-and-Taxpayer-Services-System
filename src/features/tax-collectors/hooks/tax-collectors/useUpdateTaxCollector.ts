import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxCollectorsApi } from "../../api/taxCollectorsApi";

export const useUpdateTaxCollector = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string | number; data: FormData }) =>
            taxCollectorsApi.updateTaxCollector(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tax-collectors"],
            });
        },
    });
};
