import { useMutation, useQueryClient } from "@tanstack/react-query"
import { attachmentApi } from "../../api/attachmentApi"

export const useCreateAttachment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => attachmentApi.createAttachment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attachments"] })
        },
    })
}