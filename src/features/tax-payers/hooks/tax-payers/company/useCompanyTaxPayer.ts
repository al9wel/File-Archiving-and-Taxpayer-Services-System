import { useQuery } from "@tanstack/react-query"
import { companyTaxPayersApi } from "../../../api/companyTaxPayersApi"

export const useCompanyTaxPayer = (id: string | number) => {
    return useQuery({
        queryKey: ["company-tax-payers", id],
        queryFn: async () => companyTaxPayersApi.getTaxPayer(id),
        enabled: !!id,
    })
}
