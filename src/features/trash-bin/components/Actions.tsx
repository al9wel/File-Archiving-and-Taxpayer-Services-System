import type { RecycleBin } from "@/types/RecycleBin"
import { RestoreDialog } from "./RestoreDialog"
import { PermanentDeleteDialog } from "./PermanentDeleteDialog"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"

export const Actions = ({ item }: { item: RecycleBin }) => {
    const canRestore = usePermission(ACTIONS.RESTORE_TRASH_BIN)
    const canDelete = usePermission(ACTIONS.DELETE_TRASH_BIN)

    return (
        <div className="flex items-center justify-center gap-2">
            {canRestore && <RestoreDialog item={item} />}
            {canDelete && <PermanentDeleteDialog item={item} />}
        </div>
    )
}
