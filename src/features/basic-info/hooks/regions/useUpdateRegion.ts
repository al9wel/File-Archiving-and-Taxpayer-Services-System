import { useMutation, useQueryClient } from "@tanstack/react-query";
import { regionsApi } from "../../api/regionsApi";

export const useUpdateRegion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number | string; data: FormData }) =>
            regionsApi.updateRegion(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["regions"] });
        },
    });
};
