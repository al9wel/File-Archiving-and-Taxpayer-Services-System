import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingsApi } from "../api/settingsApi";
import type { ChangePasswordPayload, ChangePasswordResponse } from "../../../types/Settings";

export const useChangePassword = () => {
    return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
        mutationFn: settingsApi.changePassword,
        onSuccess: (response) => {
            toast.success(response?.message || "تم تغيير كلمة المرور بنجاح");
        },
        onError: (error) => {
            toast.error(error.message || "فشل تغيير كلمة المرور، يرجى المحاولة مرة أخرى");
        },
    });
};
