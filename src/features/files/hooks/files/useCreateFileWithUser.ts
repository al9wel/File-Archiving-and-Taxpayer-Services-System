import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fileApi } from "../../api/fileApi"

export const useCreateFileWithUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => fileApi.createFileWithUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] })
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })
}
