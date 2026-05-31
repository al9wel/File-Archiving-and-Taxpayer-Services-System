import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestsApi } from "../api/requestsApi";
import { toast } from "sonner";

export const useApproveRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (requestId: string | number) => requestsApi.approveRequest(requestId),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["requests"],
            });
            toast.success(res.message || "تم قبول الطلب بنجاح");
        },
        onError: (error) => {
            toast.error(error.message || "حدث خطأ أثناء قبول الطلب");
        }
    });
};