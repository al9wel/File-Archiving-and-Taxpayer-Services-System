import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fileMovementsApi } from "../api/fileMovementsApi"

export const useDeleteFileMovement = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string | number) => fileMovementsApi.deleteFileMovement(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["file-movements"],
            })
        },
    })
}
