import { Button } from "@/components/ui/button"
import Unauthorized from "@/app/pages/Unauthorized"
import { ACTIONS } from "@/constants/permissions"
import { ROUTES } from "@/constants/routes"
import { usePermission } from "@/hooks/usePermission"
import ChatHeader from "../components/ChatHeader"
import ChatInput from "../components/ChatInput"
import ChatMessage from "../components/ChatMessage"
import EmptyConversationState from "../components/EmptyConversationState"
import TypingIndicator from "../components/TypingIndicator"
import type { CustomerServiceConversation } from "../types/CustomerService"
import { ArrowRight } from "lucide-react"
import { Link, useParams } from "react-router-dom"

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
            {
                id: "msg-3",
                sender: "customer",
                content: "شكراً لك. هل توجد مستندات ناقصة حالياً؟",
                time: "09:17",
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

const ConversationDetailsPage = () => {
    const { conversationId } = useParams()
    const canView = usePermission(ACTIONS.VIEW_CUSTOMER_SERVICE)
    const conversation = conversations.find((item) => item.id === conversationId) || conversations[0]

    if (!canView) return <Unauthorized />

    return (
        <div className="flex h-[calc(100vh-96px)] w-full flex-col px-3 py-3 animate-in fade-in duration-500" dir="rtl">
            <div className="mb-3 flex items-center justify-between gap-3">
                <Button variant="outline" size="sm" asChild>
                    <Link to={ROUTES.DASHBOARD.CUSTOMER_SERVICE.ROOT}>
                        <ArrowRight size={16} />
                        المحادثات
                    </Link>
                </Button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-muted/25 shadow-sm">
                <ChatHeader
                    customerName={conversation.customerName}
                    customerInitials={conversation.customerInitials}
                    conversationId={conversation.id}
                    status={conversation.status}
                />

                <div className="min-h-0 flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6">
                    {conversation.messages.length ? (
                        <div className="mx-auto flex max-w-5xl flex-col gap-4">
                            {conversation.messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                            {conversation.status === "Open" && <TypingIndicator />}
                        </div>
                    ) : (
                        <EmptyConversationState title="لا توجد رسائل بعد" />
                    )}
                </div>

                <ChatInput />
            </div>
        </div>
    )
}

export default ConversationDetailsPage
