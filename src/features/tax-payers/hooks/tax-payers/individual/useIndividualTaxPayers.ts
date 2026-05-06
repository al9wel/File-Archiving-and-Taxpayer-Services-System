import { useQuery } from "@tanstack/react-query"
import { individualTaxPayersApi } from "../../../api/individualTaxPayersApi"

export const useIndividualTaxPayers = () => {
    return useQuery({
        queryKey: ["individual-tax-payers"],
        queryFn: async () => individualTaxPayersApi.getTaxPayers(),
    })
}
