import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employmentTypesApi } from "../../api/employmentTypesApi";

export const useUpdateEmploymentType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string | number; data: FormData }) =>
            employmentTypesApi.updateEmploymentType(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employment-types"],
            });
        },
    });
};
