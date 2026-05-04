import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentTypesApi } from "../../api/paymentTypesApi";

export const useCreatePaymentType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormData) => paymentTypesApi.createPaymentType(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment-types"] });
        },
    });
};
