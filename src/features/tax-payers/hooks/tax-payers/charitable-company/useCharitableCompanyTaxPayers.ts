import { useQuery } from "@tanstack/react-query"
import { charitableCompanyTaxPayersApi } from "../../../api/charitableCompanyTaxPayersApi"

export const useCharitableCompanyTaxPayers = () => {
    return useQuery({
        queryKey: ["charitable-company-tax-payers"],
        queryFn: async () => charitableCompanyTaxPayersApi.getTaxPayers(),
    })
}
