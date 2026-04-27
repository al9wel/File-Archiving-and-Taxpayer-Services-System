import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentsApi } from "../../api/departmentsApi";

export const useUpdateDepartment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string | number; data: FormData }) => {
            const res = await departmentsApi.updateDepartment(id, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });
        },
    });
};
