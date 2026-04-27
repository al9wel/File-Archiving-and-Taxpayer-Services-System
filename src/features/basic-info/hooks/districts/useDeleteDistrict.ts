import { useMutation, useQueryClient } from "@tanstack/react-query";
import { districtsApi } from "../../api/districtsApi";

export const useDeleteDistrict = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: districtsApi.deleteDistrict,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["districts"] });
        },
    });
};
