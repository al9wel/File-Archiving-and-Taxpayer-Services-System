import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fileApi } from "../../api/fileApi"

export const useDeleteFile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | number) => fileApi.deleteFile(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] })
        },
    })
}