import { fetchClient } from "@/lib/fetchClient";
import type {
    ChangePasswordApiPayload,
    ChangePasswordPayload,
    ChangePasswordResponse,
} from "@/types/Settings";

const toApiPayload = (data: ChangePasswordPayload): ChangePasswordApiPayload => ({
    current_password: data.currentPassword,
    new_password: data.newPassword,
    new_password_confirmation: data.confirmPassword,
});

export const settingsApi = {
    changePassword: (data: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
        return fetchClient("/reset-password", {
            method: "POST",
            body: JSON.stringify(toApiPayload(data)),
        });
    },
};
