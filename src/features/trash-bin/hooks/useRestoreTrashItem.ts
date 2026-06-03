import { useMutation, useQueryClient } from "@tanstack/react-query"
import { trashBinApi } from "../api/trashBinApi"

export const useRestoreTrashItem = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string | number) => trashBinApi.restoreTrashItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["trash-bin"],
            })
        },
    })
}
