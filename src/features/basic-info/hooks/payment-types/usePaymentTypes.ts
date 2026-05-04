import { useQuery } from "@tanstack/react-query";
import { paymentTypesApi } from "../../api/paymentTypesApi";

export const usePaymentTypes = () => {
    return useQuery({
        queryKey: ["payment-types"],
        queryFn: async () => paymentTypesApi.getPaymentTypes(),
    });
};
