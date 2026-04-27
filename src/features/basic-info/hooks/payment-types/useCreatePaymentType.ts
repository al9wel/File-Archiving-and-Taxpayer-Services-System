import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentTypesApi } from "../../api/paymentTypesApi";

export const useCreatePaymentType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: paymentTypesApi.createPaymentType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment-types"] });
        },
    });
};
