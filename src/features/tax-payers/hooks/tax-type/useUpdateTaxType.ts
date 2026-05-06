import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taxTypesApi } from "../../api/taxTypesApi"

export const useUpdateTaxType = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: FormData }) => taxTypesApi.updateTaxType(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tax-types"] })
        },
    })
}
