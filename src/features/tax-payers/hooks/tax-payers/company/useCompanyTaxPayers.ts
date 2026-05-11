import { useQuery } from "@tanstack/react-query"
import { companyTaxPayersApi } from "../../../api/companyTaxPayersApi"

export const useCompanyTaxPayers = () => {
    return useQuery({
        queryKey: ["company-tax-payers"],
        queryFn: async () => companyTaxPayersApi.getTaxPayers(),
    })
}
