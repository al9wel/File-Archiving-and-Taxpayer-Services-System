import { useQuery } from "@tanstack/react-query";
import { departmentsApi } from "../../api/departmentsApi";

export const useDepartments = () => {
    return useQuery({
        queryKey: ["departments"],
        queryFn: async () => departmentsApi.getDepartments(),
    });
};
