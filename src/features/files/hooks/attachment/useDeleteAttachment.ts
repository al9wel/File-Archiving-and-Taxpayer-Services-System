import { useMutation, useQueryClient } from "@tanstack/react-query"
import { attachmentApi } from "../../api/attachmentApi"

export const useDeleteAttachment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | number) => attachmentApi.deleteAttachment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attachments"] })
        },
    })
}