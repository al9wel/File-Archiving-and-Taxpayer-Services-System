import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileStatusApi } from "../../api/fileStatusApi";

export const useCreateFileStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => fileStatusApi.createFileStatus(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["file-statuses"] });
        },
    });
};
