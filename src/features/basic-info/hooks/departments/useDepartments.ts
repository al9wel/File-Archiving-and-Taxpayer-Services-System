import { useQuery } from "@tanstack/react-query";
import { departmentsApi } from "../../api/departmentsApi";

export const useDepartments = () => {
    return useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const res = await departmentsApi.getDepartments();
            return res.data;
        },
    });
};
