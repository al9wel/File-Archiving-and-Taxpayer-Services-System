import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fileMovementsApi } from "../api/fileMovementsApi"

export const useCreateFileMovement = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: FormData) => fileMovementsApi.createFileMovement(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["file-movements"],
            })
        },
    })
}
