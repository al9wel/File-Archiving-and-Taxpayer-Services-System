import { fetchClient } from "@/lib/fetchClient"
import type { RecycleBin } from "@/types/RecycleBin"

export const trashBinApi = {
    getTrashItems: (): Promise<{ data: RecycleBin[]; message: string }> => {
        return fetchClient("/recycle-pin", {
            method: "GET",
        })
    },

    restoreTrashItem: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/recycle-pin/${id}/restore`, {
            method: "POST",
        })
    },

    permanentlyDeleteTrashItem: (id: string | number): Promise<{ message: string }> => {
        return fetchClient(`/recycle-pin/${id}`, {
            method: "DELETE",
        })
    },
}
