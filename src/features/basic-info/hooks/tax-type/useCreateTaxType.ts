import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taxTypesApi } from "../../api/taxTypesApi"

export const useCreateTaxType = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => taxTypesApi.createTaxType(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tax-types"] })
        },
    })
}