import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileStatusApi } from "../../api/fileStatusApi";

export const useUpdateFileStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: FormData }) =>
            fileStatusApi.updateFileStatus(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["file-statuses"] });
        },
    });
};
