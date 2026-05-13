import { useMutation, useQueryClient } from "@tanstack/react-query"
import { charitableCompanyTaxPayersApi } from "../../../api/charitableCompanyTaxPayersApi"

export const useDeleteCharitableCompanyTaxPayer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | number) => charitableCompanyTaxPayersApi.deleteTaxPayer(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["charitable-company-tax-payers"] })
            queryClient.invalidateQueries({ queryKey: ["tax-payers"] })
        },
    })
}
