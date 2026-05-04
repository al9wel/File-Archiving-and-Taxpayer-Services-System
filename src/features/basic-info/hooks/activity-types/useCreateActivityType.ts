import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityTypesApi } from "../../api/activityTypesApi";

export const useCreateActivityType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormData) => activityTypesApi.createActivityType(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activity-types"] });
        },
    });
};
