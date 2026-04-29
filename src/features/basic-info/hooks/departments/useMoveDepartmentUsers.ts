import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentsApi } from "../../api/departmentsApi";

export const useMoveDepartmentUsers = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({oldId, newId}:{oldId: string | number, newId: string | number}) => {
            const res = await departmentsApi.moveUsersDepartment(oldId, newId);
            return res.message;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });
        },
    });
};
