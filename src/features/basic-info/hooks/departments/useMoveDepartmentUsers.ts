import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentsApi } from "../../api/departmentsApi";

export const useMoveDepartmentUsers = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({oldId, newId}:{oldId: string | number, newId: string | number}) => departmentsApi.moveUsersDepartment(oldId, newId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });
        },
    });
};
