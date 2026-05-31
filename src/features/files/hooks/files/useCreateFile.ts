import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fileApi } from "../../api/fileApi"

export const useCreateFile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => fileApi.createFile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] })
        },
    })
}