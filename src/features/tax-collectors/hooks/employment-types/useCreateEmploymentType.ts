import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employmentTypesApi } from "../../api/employmentTypesApi";

export const useCreateEmploymentType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormData) => employmentTypesApi.createEmploymentType(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employment-types"],
            });
        },
    });
};
