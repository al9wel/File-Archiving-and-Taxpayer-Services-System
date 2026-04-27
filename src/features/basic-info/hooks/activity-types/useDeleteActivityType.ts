import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityTypesApi } from "../../api/activityTypesApi";

export const useDeleteActivityType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: activityTypesApi.deleteActivityType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activity-types"] });
        },
    });
};
