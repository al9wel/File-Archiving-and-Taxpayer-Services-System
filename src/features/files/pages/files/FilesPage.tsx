import { DataTable } from "../../components/files/data-table"
import { columns } from "../../components/files/columns"
import { useFiles } from "../../hooks/files/useFiles"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

/**
 * Main Files Management page.
 * Displays a list of all system files in a searchable DataTable and provides
 * access to create, view, edit, and delete operations.
 */
const FilesPage = () => {
    const { data, isPending, isError } = useFiles()
    const canView = usePermission(ACTIONS.VIEW_FILE)

    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }
    return (
        <>
            {/* <div className="w-full px-3 pt-3">
                <DashboardHeader title=" الملفات " desc="إدارة جميع ملفات المكلفين في النظام" />
            </div> */}
            <div className="container mx-auto px-3 animate-in fade-in duration-500">
                {isPending ? (
                    <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <p className="text-muted-foreground animate-pulse">جاري جلب الملفات...</p>
                    </div>
                ) : (
                    <DataTable columns={columns} data={data?.data || []} />
                )}
            </div>
        </>
    )
}

export default FilesPage