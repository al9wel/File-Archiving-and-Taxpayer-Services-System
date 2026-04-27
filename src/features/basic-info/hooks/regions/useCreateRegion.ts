import { useMutation, useQueryClient } from "@tanstack/react-query";
import { regionsApi } from "../../api/regionsApi";

export const useCreateRegion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: regionsApi.createRegion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["regions"] });
        },
    });
};
