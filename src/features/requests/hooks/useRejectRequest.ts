import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestsApi } from "../api/requestsApi";
import { toast } from "sonner";

export const useRejectRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (requestId: string | number) => requestsApi.rejectRequest(requestId),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["requests"],
            });
            toast.success(res.message || "تم رفض الطلب بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.message || "حدث خطأ أثناء رفض الطلب");
        }
    });
};
