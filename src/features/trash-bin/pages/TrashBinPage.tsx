import DashboardHeader from "@/components/layout/DahsboardHeader"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { useTrashBin } from "../hooks/useTrashBin"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

const TrashBinPage = () => {
    const { data, isLoading, isError } = useTrashBin()
    const canView = usePermission(ACTIONS.VIEW_TRASH_BIN)

    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title="سلة المهملات"
                    desc="إدارة العناصر المحذوفة واسترجاعها أو حذفها نهائياً من النظام"
                />
            </div>

            <div className="container mx-auto px-3 animate-in fade-in duration-500 space-y-6">
                {isLoading ? (
                    <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <p className="text-muted-foreground animate-pulse">جاري جلب عناصر سلة المهملات...</p>
                    </div>
                ) : (
                    <DataTable columns={columns} data={data?.data || []} />
                )}
            </div>
        </>
    )
}

export default TrashBinPage
