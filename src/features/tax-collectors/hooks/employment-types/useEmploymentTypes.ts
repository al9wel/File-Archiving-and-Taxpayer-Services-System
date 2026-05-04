import { useQuery } from "@tanstack/react-query";
import { employmentTypesApi } from "../../api/employmentTypesApi";

export const useEmploymentTypes = () => {
    return useQuery({
        queryKey: ["employment-types"],
        queryFn: async () => employmentTypesApi.getEmploymentTypes(),
    });
};
