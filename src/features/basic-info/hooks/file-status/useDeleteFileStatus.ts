import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileStatusApi } from "../../api/fileStatusApi";

export const useDeleteFileStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => fileStatusApi.deleteFileStatus(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["file-statuses"] });
        },
    });
};
