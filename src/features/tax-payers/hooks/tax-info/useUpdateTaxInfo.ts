import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taxInfoApi } from "../../api/taxInfoApi"

export const useUpdateTaxInfo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: FormData }) => taxInfoApi.updateTaxInfo(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tax-infos"] })
        },
    })
}
