import { useMutation, useQueryClient } from "@tanstack/react-query"
import { companyTaxPayersApi } from "../../../api/companyTaxPayersApi"

export const useUpdateCompanyTaxPayer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: FormData }) => companyTaxPayersApi.updateTaxPayer(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["company-tax-payers"] })
            queryClient.invalidateQueries({ queryKey: ["company-tax-payers", variables.id] })
        },
    })
}
