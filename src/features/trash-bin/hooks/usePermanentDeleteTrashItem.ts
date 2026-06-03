import { useMutation, useQueryClient } from "@tanstack/react-query"
import { trashBinApi } from "../api/trashBinApi"

export const usePermanentDeleteTrashItem = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string | number) => trashBinApi.permanentlyDeleteTrashItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["trash-bin"],
            })
        },
    })
}
