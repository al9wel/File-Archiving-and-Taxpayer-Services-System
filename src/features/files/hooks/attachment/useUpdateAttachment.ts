import { useMutation, useQueryClient } from "@tanstack/react-query"
import { attachmentApi } from "../../api/attachmentApi"

export const useUpdateAttachment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: FormData }) => attachmentApi.updateAttachment(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attachments"] })
        },
    })
}