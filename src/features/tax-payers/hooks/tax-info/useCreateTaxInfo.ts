import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taxInfoApi } from "../../api/taxInfoApi"

export const useCreateTaxInfo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => taxInfoApi.createTaxInfo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tax-infos"] })
        },
    })
}
