import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentsApi } from "../../api/departmentsApi";

export const useDeleteDepartment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | number) => departmentsApi.deleteDepartment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });
        },
    });
};
