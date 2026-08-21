import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taxTypesApi } from "../../api/taxTypesApi"

export const useDeleteTaxType = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | number) => taxTypesApi.deleteTaxType(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tax-types"] })
        },
    })
}
