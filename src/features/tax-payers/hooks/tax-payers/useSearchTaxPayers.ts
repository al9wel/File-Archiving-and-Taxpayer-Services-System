import { useQuery } from "@tanstack/react-query"
import { taxPayersApi } from "../../api/taxPayersApi"

export const useSearchTaxPayers = (searchQuery: string) => {
    return useQuery({
        queryKey: ["tax-payers", searchQuery],
        queryFn: () => taxPayersApi.getTaxPayers(searchQuery),
    })
}
