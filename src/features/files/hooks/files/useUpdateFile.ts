import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fileApi } from "../../api/fileApi"

export const useUpdateFile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: FormData }) => fileApi.updateFile(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] })
        },
    })
}