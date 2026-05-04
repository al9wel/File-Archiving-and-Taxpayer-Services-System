import { useMutation, useQueryClient } from "@tanstack/react-query";
import { districtsApi } from "../../api/districtsApi";

export const useCreateDistrict = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormData) => districtsApi.createDistrict(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["districts"] });
        },
    });
};
