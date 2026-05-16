import { useQuery } from "@tanstack/react-query";
import { fileStatusApi } from "../../api/fileStatusApi";

export const useFileStatuses = () => {
    return useQuery({
        queryKey: ["file-statuses"],
        queryFn: async () => fileStatusApi.getFileStatuses(),
    });
};
