import { useMutation, useQueryClient } from "@tanstack/react-query"
import { individualTaxPayersApi } from "../../../api/individualTaxPayersApi"

export const useCreateIndividualTaxPayer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => individualTaxPayersApi.createTaxPayer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["individual-tax-payers"] })
        },
    })
}