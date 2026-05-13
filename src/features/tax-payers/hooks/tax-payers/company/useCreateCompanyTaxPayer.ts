import { useMutation, useQueryClient } from "@tanstack/react-query"
import { companyTaxPayersApi } from "../../../api/companyTaxPayersApi"

export const useCreateCompanyTaxPayer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => companyTaxPayersApi.createTaxPayer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["company-tax-payers"] })
            queryClient.invalidateQueries({ queryKey: ["tax-payers"] })
        },
    })
}