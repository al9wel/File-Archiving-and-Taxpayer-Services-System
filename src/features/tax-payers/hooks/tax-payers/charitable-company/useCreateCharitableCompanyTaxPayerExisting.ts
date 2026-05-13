import { useMutation, useQueryClient } from "@tanstack/react-query"
import { charitableCompanyTaxPayersApi } from "../../../api/charitableCompanyTaxPayersApi"

export const useCreateCharitableCompanyTaxPayerExisting = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: FormData) => charitableCompanyTaxPayersApi.createTaxPayerExisting(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["charitable-company-tax-payers"] })
            queryClient.invalidateQueries({ queryKey: ["tax-payers"] })

        },
    })
}
