import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentTypesApi } from "../../api/paymentTypesApi";

export const useDeletePaymentType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: paymentTypesApi.deletePaymentType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment-types"] });
        },
    });
};
