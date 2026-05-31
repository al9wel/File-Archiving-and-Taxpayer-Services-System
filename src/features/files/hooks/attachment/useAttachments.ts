import { useQuery } from "@tanstack/react-query"
import { attachmentApi } from "../../api/attachmentApi"

export const useAttachments = () => {
    return useQuery({
        queryKey: ["attachments"],
        queryFn: async () => attachmentApi.getAttachments(),
    })
}