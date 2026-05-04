import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityTypesApi } from "../../api/activityTypesApi";

export const useDeleteActivityType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | number) => activityTypesApi.deleteActivityType(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activity-types"] });
        },
    });
};
