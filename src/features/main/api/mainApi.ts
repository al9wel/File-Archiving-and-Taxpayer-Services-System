import { fetchClient } from "@/lib/fetchClient"
import type { DashboardStatisticsResponse } from "../../../types/Dashboard"

export const mainApi = {
  getStatistics: (): Promise<DashboardStatisticsResponse> => {
    return fetchClient("/statistics", {
      method: "GET",
    })
  },
}
