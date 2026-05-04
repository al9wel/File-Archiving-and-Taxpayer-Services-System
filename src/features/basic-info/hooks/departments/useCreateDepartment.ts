import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentsApi } from "../../api/departmentsApi";

export const useCreateDepartment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormData) => departmentsApi.createDepartment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });
        },
    });
};
