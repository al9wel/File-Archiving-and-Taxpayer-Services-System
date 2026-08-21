import { useQuery } from "@tanstack/react-query"
import { taxTypesApi } from "../../api/taxTypesApi"

export const useTaxTypes = () => {
    return useQuery({
        queryKey: ["tax-types"],
        queryFn: async () => taxTypesApi.getTaxTypes(),
    })
}
