import { useMutation, useQueryClient } from "@tanstack/react-query"
import { charitableCompanyTaxPayersApi } from "../../../api/charitableCompanyTaxPayersApi"

export const useUpdateCharitableCompanyTaxPayer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: FormData }) => charitableCompanyTaxPayersApi.updateTaxPayer(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["charitable-company-tax-payers"] })
            queryClient.invalidateQueries({ queryKey: ["charitable-company-tax-payers", variables.id] })
        },
    })
}
