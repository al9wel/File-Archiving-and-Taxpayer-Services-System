import DashboardHeader from "@/components/layout/DahsboardHeader"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { useOperationReports } from "../hooks/useOperationReports"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

/**
 * Operations Reports Page.
 * Displays system activity logs in a DataTable with filtering and read-only access.
 */
const OperationReports = () => {
    const { data, isLoading, isError } = useOperationReports()
    const canView = usePermission(ACTIONS.VIEW_REPORT)

    if (!canView) return <Unauthorized />
    if (isError) {
        return <ErrorState />
    }
    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" تقارير العمليات "
                    desc="مراقبة ومتابعة جميع العمليات والأنشطة في النظام"
                />
            </div>

            <div className=" mx-auto px-3 animate-in fade-in duration-500 space-y-6">
                {isLoading ? (
                    <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <p className="text-muted-foreground animate-pulse">جاري جلب تقارير العمليات...</p>
                    </div>
                ) : (
                    <>
                        <DataTable columns={columns} data={data?.data || []} />
                    </>
                )}
            </div>
        </>
    )
}

export default OperationReports
