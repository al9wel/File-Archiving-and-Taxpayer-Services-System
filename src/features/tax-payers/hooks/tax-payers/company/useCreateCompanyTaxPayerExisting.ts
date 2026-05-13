import { useMutation, useQueryClient } from "@tanstack/react-query"
import { companyTaxPayersApi } from "../../../api/companyTaxPayersApi"

export const useCreateCompanyTaxPayerExisting = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: FormData) => companyTaxPayersApi.createTaxPayerExisting(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["company-tax-payers"] })
            queryClient.invalidateQueries({ queryKey: ["tax-payers"] })
        },
    })
}
