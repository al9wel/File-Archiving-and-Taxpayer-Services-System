import { useMutation, useQueryClient } from "@tanstack/react-query";
import { regionsApi } from "../../api/regionsApi";

export const useDeleteRegion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | number) => regionsApi.deleteRegion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["regions"] });
        },
    });
};
