import { useMutation, useQueryClient } from "@tanstack/react-query";
import { regionsApi } from "../../api/regionsApi";

export const useDeleteRegion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: regionsApi.deleteRegion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["regions"] });
        },
    });
};
