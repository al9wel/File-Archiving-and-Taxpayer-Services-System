import { useMutation, useQueryClient } from "@tanstack/react-query"
import { charitableCompanyTaxPayersApi } from "../../../api/charitableCompanyTaxPayersApi"

export const useCreateCharitableCompanyTaxPayer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => charitableCompanyTaxPayersApi.createTaxPayer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["charitable-company-tax-payers"] })
        },
    })
}