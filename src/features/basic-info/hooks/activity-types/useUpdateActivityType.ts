import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityTypesApi } from "../../api/activityTypesApi";

export const useUpdateActivityType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number | string; data: FormData }) => activityTypesApi.updateActivityType(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activity-types"] });
        },
    });
};
