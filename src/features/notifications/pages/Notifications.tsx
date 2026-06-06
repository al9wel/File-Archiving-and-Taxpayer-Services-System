import DashboardHeader from "@/components/layout/DahsboardHeader"
import { NotificationsList } from "../components/NotificationsList"
import { useNotifications } from "../hooks/useNotifications"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"
import { NotificationStatisticsCards } from "../components/NotificationStatisticsCards"

/**
 * Main Notifications Management page.
 * Displays a list of all notifications in a responsive grid card layout.
 */
const NotificationsPage = () => {
    const { data, isPending, isError } = useNotifications()
    const canView = usePermission(ACTIONS.VIEW_NOTIFICATION)

    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader title=" الإشعارات " desc="إدارة جميع الإشعارات في النظام" />
            </div>
            <div className=" mx-auto px-3 animate-in fade-in duration-500">
                {isPending ? (
                    <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <p className="text-muted-foreground animate-pulse">جاري جلب الإشعارات...</p>
                    </div>
                ) : (
                    <>
                        <NotificationStatisticsCards />
                        <NotificationsList notifications={data?.data || []} />
                    </>
                )}
            </div>
        </>
    )
}

export default NotificationsPage
