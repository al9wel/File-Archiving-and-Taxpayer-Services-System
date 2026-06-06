import DashboardHeader from "@/components/layout/DahsboardHeader"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { useFileMovements } from "../hooks/useFileMovements"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

import { FileMovementStatisticsCards } from "../components/FileMovementStatisticsCards"
import type { FileMovementStatistics } from "@/types/FileMovments"

/**
 * Main File Movements Management page.
 * Displays a list of all file movements in a searchable DataTable and provides
 * access to create, view, edit, and delete operations.
 */
const FileMovements = () => {
    const { data, isPending, isError } = useFileMovements()
    const canView = usePermission(ACTIONS.VIEW_FILE_MOVEMENT)

    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }
    const fileMovements = data?.data?.filesMovements || []
    const statistics = data?.data?.statistics

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader title=" حركة الملفات " desc="إدارة وتتبع حركات الملفات في النظام" />
            </div>
            <div className=" mx-auto px-3 animate-in fade-in duration-500">
                {isPending ? (
                    <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <p className="text-muted-foreground animate-pulse">جاري جلب حركات الملفات...</p>
                    </div>
                ) : (
                    <>
                        <div className="w-full">
                            <FileMovementStatisticsCards statistics={statistics as FileMovementStatistics} />
                        </div>
                        <DataTable columns={columns} data={fileMovements} />
                    </>
                )}
            </div>
        </>
    )
}

export default FileMovements
