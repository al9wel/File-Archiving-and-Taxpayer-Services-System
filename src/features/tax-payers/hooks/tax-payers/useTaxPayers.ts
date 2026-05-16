import { useQuery } from "@tanstack/react-query"
import { taxPayersApi } from "../../api/taxPayersApi"

export const useTaxPayers = () => {
    return useQuery({
        queryKey: ["tax-payers"],
        queryFn: () => taxPayersApi.getTaxPayers(),
    })
}
