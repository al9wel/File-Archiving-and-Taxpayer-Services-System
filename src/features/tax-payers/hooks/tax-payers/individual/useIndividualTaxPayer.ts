import { useQuery } from "@tanstack/react-query"
import { individualTaxPayersApi } from "../../../api/individualTaxPayersApi"

export const useIndividualTaxPayer = (id: string | number) => {
    return useQuery({
        queryKey: ["individual-tax-payers", id],
        queryFn: async () => individualTaxPayersApi.getTaxPayer(id),
        enabled: !!id,
    })
}
