import { useQuery } from "@tanstack/react-query"
import { attachmentApi } from "../../api/attachmentApi"

export const useAttachment = (id: string | number) => {
    return useQuery({
        queryKey: ["attachments", id],
        queryFn: async () => attachmentApi.getAttachment(id),
        enabled: !!id,
    })
}