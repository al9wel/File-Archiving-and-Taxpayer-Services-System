import Unauthorized from "@/app/pages/Unauthorized"
import { ACTIONS } from "@/constants/permissions"
import { usePermission } from "@/hooks/usePermission"
import ConversationList from "../components/ConversationList"
import DashboardHeader from "@/components/layout/DahsboardHeader"
// import { CustomerServiceStatisticsCards } from "../components/CustomerServiceStatisticsCards"
import { useChats } from "../hooks/useChats"
import ErrorState from "@/app/pages/ErrorState"
import { Loader2 } from "lucide-react"

const ConversationsPage = () => {
    const canView = usePermission(ACTIONS.VIEW_CUSTOMER_SERVICE)
    const { data: conversations, isPending, isError } = useChats()

    if (!canView) return <Unauthorized />
    if (isError) {
        return <ErrorState />
    }

    return (
        <div className="w-full space-y-5 px-3 py-3 animate-in fade-in duration-500" dir="rtl">
            <div className="w-full px-3 pt-3">
                <DashboardHeader title=" خدمة العملاء " desc="إدارة محادثات العملاء" />
            </div>
            {isPending ? (
                <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <p className="text-muted-foreground animate-pulse">جاري تحميل المحادثات...</p>
                </div>
            ) : (
                <>
                    {/* <CustomerServiceStatisticsCards /> */}
                    <ConversationList conversations={conversations} />
                </>
            )}
        </div>
    )
}

export default ConversationsPage
