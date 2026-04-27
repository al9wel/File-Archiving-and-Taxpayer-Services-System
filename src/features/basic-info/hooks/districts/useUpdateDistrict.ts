import { useMutation, useQueryClient } from "@tanstack/react-query";
import { districtsApi } from "../../api/districtsApi";

export const useUpdateDistrict = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number | string; data: FormData }) =>
            districtsApi.updateDistrict(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["districts"] });
        },
    });
};
