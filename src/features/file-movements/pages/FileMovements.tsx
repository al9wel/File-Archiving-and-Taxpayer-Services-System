import DashboardHeader from "@/components/layout/DahsboardHeader"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { useFileMovements } from "../hooks/useFileMovements"
import { useFileMovementsReport } from "../hooks/useFileMovementsReport"
import { Loader2, FileText } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
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
    const { refetch: getMovementsReports, isFetching: isMovementsReportsLoading } = useFileMovementsReport()
    const canView = usePermission(ACTIONS.VIEW_FILE_MOVEMENT)
    const canViewReport = usePermission(ACTIONS.VIEW_REPORT)

    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }
    const fileMovements = data?.data?.filesMovements || []
    const statistics = data?.data?.statistics

    const handleMovementsReport = async () => {
        const result = await getMovementsReports()
        if (result.data?.data?.report_url) {
            window.open(result.data.data.report_url, '_blank', 'noopener,noreferrer')
        } else {
            toast.error("تعذر الحصول على التقرير")
        }
    }

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
                        {canViewReport && (
                            <div className="flex justify-end mb-3">
                                <Button
                                    onClick={handleMovementsReport}
                                    disabled={isMovementsReportsLoading}
                                >
                                    {isMovementsReportsLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <FileText className="h-4 w-4" />
                                    )}
                                    <span className="mr-2">تقرير الحركات</span>
                                </Button>
                            </div>
                        )}
                        <DataTable columns={columns} data={fileMovements} />
                    </>
                )}
            </div>
        </>
    )
}

export default FileMovements
