import { useMutation, useQueryClient } from "@tanstack/react-query"
import { companyTaxPayersApi } from "../../../api/companyTaxPayersApi"

export const useDeleteCompanyTaxPayer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | number) => companyTaxPayersApi.deleteTaxPayer(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["company-tax-payers"] })
        },
    })
}
