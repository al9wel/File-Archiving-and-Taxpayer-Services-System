import DashboardHeader from "@/components/layout/DahsboardHeader"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { useUsers } from "../hooks/useUsers"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"
import { UserStatisticsCards } from "../components/UserStatisticsCards"
import type { UserStatistics } from "@/types/User"

/**
 * Main User Management page.
 * Displays a list of all system users in a searchable DataTable and provides
 * access to create, view, edit, and delete operations.
 */
const Users = () => {
    const { data, isPending, isError } = useUsers()
    const canView = usePermission(ACTIONS.VIEW_USER)
    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }
    const users = data?.data?.users || []
    const statistics = data?.data?.statistics || []
    return (
        <>

            <div className="w-full px-3 pt-3">
                <DashboardHeader title=" المستخدمين " desc="إدارة جميع المستخدمين في النظام" />
            </div>
            <div className=" mx-auto px-3 animate-in fade-in duration-500">
                {isPending ? (
                    <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <p className="text-muted-foreground animate-pulse">جاري جلب المستخدمين...</p>
                    </div>
                ) : (
                    <>
                        <div className="w-full">
                            <UserStatisticsCards statistics={statistics as UserStatistics} />
                        </div>
                        <DataTable columns={columns} data={users} />
                    </>
                )}
            </div>
        </>
    )
}

export default Users
