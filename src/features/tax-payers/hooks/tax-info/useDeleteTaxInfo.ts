import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taxInfoApi } from "../../api/taxInfoApi"

export const useDeleteTaxInfo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | number) => taxInfoApi.deleteTaxInfo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tax-infos"] })
        },
    })
}
