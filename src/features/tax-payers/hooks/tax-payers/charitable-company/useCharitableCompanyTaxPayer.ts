import { useQuery } from "@tanstack/react-query"
import { charitableCompanyTaxPayersApi } from "../../../api/charitableCompanyTaxPayersApi"

export const useCharitableCompanyTaxPayer = (id: string | number) => {
    return useQuery({
        queryKey: ["charitable-company-tax-payers", id],
        queryFn: async () => charitableCompanyTaxPayersApi.getTaxPayer(id),
        enabled: !!id,
    })
}
