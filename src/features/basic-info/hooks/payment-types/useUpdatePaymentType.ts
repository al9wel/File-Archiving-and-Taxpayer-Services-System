import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentTypesApi } from "../../api/paymentTypesApi";

export const useUpdatePaymentType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number | string; data: FormData }) => paymentTypesApi.updatePaymentType(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment-types"] });
        },
    });
};
