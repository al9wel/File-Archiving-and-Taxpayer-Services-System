import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employmentTypesApi } from "../../api/employmentTypesApi";

export const useDeleteEmploymentType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | number) => employmentTypesApi.deleteEmploymentType(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employment-types"],
            });
        },
    });
};
