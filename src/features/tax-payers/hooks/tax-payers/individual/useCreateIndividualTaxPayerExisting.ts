import { useMutation, useQueryClient } from "@tanstack/react-query"
import { individualTaxPayersApi } from "../../../api/individualTaxPayersApi"

export const useCreateIndividualTaxPayerExisting = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => individualTaxPayersApi.createTaxPayerExisting(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["individual-tax-payers"] })
            queryClient.invalidateQueries({ queryKey: ["tax-payers"] })
        },
    })
}
