import { useQuery } from "@tanstack/react-query"
import { taxInfoApi } from "../../api/taxInfoApi"

export const useTaxInfos = () => {
    return useQuery({
        queryKey: ["tax-infos"],
        queryFn: async () => taxInfoApi.getTaxInfos(),
    })
}
