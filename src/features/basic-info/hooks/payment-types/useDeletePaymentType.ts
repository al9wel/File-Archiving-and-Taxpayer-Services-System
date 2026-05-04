import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentTypesApi } from "../../api/paymentTypesApi";

export const useDeletePaymentType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | number) => paymentTypesApi.deletePaymentType(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment-types"] });
        },
    });
};
