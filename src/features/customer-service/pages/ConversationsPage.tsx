import Unauthorized from "@/app/pages/Unauthorized"
import { ACTIONS } from "@/constants/permissions"
import { usePermission } from "@/hooks/usePermission"
import type { CustomerServiceConversation } from "../types/CustomerService"
import ConversationList from "../components/ConversationList"
import DashboardHeader from "@/components/layout/DahsboardHeader"
import { CustomerServiceStatisticsCards } from "../components/CustomerServiceStatisticsCards"

const conversations: CustomerServiceConversation[] = [
    {
        id: "CS-1024",
        customerName: "أحمد محمد صالح",
        customerInitials: "أم",
        lastMessage: "أرغب في معرفة حالة الملف الضريبي وآخر إجراء تم عليه.",
        date: "2026-06-06",
        unreadCount: 3,
        status: "Open",
        messages: [
            {
                id: "msg-1",
                sender: "customer",
                content: "مرحباً، أرغب في معرفة حالة الملف الضريبي وآخر إجراء تم عليه.",
                time: "09:12",
            },
            {
                id: "msg-2",
                sender: "agent",
                content: "مرحباً أستاذ أحمد، تم استلام طلبك وسيتم التحقق من حالة الملف.",
                time: "09:15",
            },
        ],
    },
    {
        id: "CS-1025",
        customerName: "شركة النور التجارية",
        customerInitials: "شن",
        lastMessage: "تم رفع المستندات المطلوبة ونحتاج تأكيد الاستلام.",
        date: "2026-06-05",
        unreadCount: 1,
        status: "Pending",
        messages: [
            {
                id: "msg-1",
                sender: "customer",
                content: "تم رفع المستندات المطلوبة ونحتاج تأكيد الاستلام.",
                time: "14:30",
            },
            {
                id: "msg-2",
                sender: "agent",
                content: "شكراً لكم، سيتم مراجعة المستندات والرد عليكم قريباً.",
                time: "14:42",
            },
        ],
    },
    {
        id: "CS-1026",
        customerName: "سارة عبد الله",
        customerInitials: "سع",
        lastMessage: "شكراً لكم، تم حل المشكلة.",
        date: "2026-06-04",
        unreadCount: 0,
        status: "Closed",
        messages: [
            {
                id: "msg-1",
                sender: "customer",
                content: "واجهت مشكلة في متابعة الطلب من لوحة المكلف.",
                time: "11:05",
            },
            {
                id: "msg-2",
                sender: "agent",
                content: "تم تحديث حالة الطلب ويمكنك المتابعة الآن.",
                time: "11:18",
            },
            {
                id: "msg-3",
                sender: "customer",
                content: "شكراً لكم، تم حل المشكلة.",
                time: "11:24",
            },
        ],
    },
]

const ConversationsPage = () => {
    const canView = usePermission(ACTIONS.VIEW_CUSTOMER_SERVICE)

    if (!canView) return <Unauthorized />

    return (
        <div className="w-full space-y-5 px-3 py-3 animate-in fade-in duration-500" dir="rtl">
            <div className="w-full px-3 pt-3">
                <DashboardHeader title=" خدمة العملاء " desc="إدارة محادثات العملاء" />
            </div>
            <CustomerServiceStatisticsCards />
            <ConversationList conversations={conversations} />
        </div>
    )
}

export default ConversationsPage
