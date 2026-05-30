import { fetchClient } from "@/lib/fetchClient";
import type { DashboardStatisticsResponse } from "@/types/Dashboard";

export const basicInfoApi={
    getBasicInfoStats: (): Promise<DashboardStatisticsResponse> => {
        return fetchClient("/statistics", {
            method: "GET",
        })
    },
}