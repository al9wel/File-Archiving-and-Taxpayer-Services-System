import { useQuery } from "@tanstack/react-query";
import { departmentsApi } from "../api/departmentsApi";

/**
 * Custom hook to fetch all departments using TanStack Query.
 * Provides easy access to department data for dropdowns and display.
 */
export const useDepartments = () => {
    return useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const res = await departmentsApi.getDepartments();
            return res.data;
        },
    });
};
