import { useQuery } from "@tanstack/react-query"

import { mainApi } from "../../api/mainApi"

export const useDashboardStatistics = () => {
  return useQuery({
    queryKey: ["mainStatistics"],
    queryFn: async () => mainApi.getStatistics(),
  })
}
