import { useMutation, useQueryClient } from "@tanstack/react-query"
import { individualTaxPayersApi } from "../../../api/individualTaxPayersApi"

export const useDeleteIndividualTaxPayer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | number) => individualTaxPayersApi.deleteTaxPayer(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["individual-tax-payers"] })
        },
    })
}
