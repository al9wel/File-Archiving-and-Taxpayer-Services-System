import { useMutation, useQueryClient } from "@tanstack/react-query"
import { individualTaxPayersApi } from "../../../api/individualTaxPayersApi"

export const useUpdateIndividualTaxPayer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: FormData }) => individualTaxPayersApi.updateTaxPayer(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["individual-tax-payers"] })
            queryClient.invalidateQueries({ queryKey: ["individual-tax-payers", variables.id] })
        },
    })
}
