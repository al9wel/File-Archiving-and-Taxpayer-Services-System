import { useQuery } from "@tanstack/react-query"

import { mainApi } from "../api/mainApi"

export const useDashboardStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: async () => mainApi.getStatistics(),
  })
}
