import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employmentTypesApi } from "../../api/employmentTypesApi";

export const useMoveEmploymentType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ newEmpId, oldEmpId }: { newEmpId: string | number, oldEmpId: string | number }) => employmentTypesApi.moveTaxCollectorsEmploymentType({ newEmpId, oldEmpId }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tax-collectors"],
            });
        },
    });
};
