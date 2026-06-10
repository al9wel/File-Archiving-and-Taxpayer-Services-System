import { Button } from "@/components/ui/button"
import Unauthorized from "@/app/pages/Unauthorized"
import { ACTIONS } from "@/constants/permissions"
import { ROUTES } from "@/constants/routes"
import { usePermission } from "@/hooks/usePermission"
import ChatHeader from "../components/ChatHeader"
import ChatInput from "../components/ChatInput"
import ChatMessage from "../components/ChatMessage"
import EmptyConversationState from "../components/EmptyConversationState"
import { ArrowRight } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useChat } from "../hooks/useChat"
import { useMessages } from "../hooks/useMessages"
import { useSendMessage } from "../hooks/useSendMessage"
import { useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import ErrorState from "@/app/pages/ErrorState"
import { toast } from "sonner"

const ConversationDetailsPage = () => {
    const { conversationId } = useParams()
    const canView = usePermission(ACTIONS.VIEW_CUSTOMER_SERVICE)

    const { data: conversation, isPending: chatLoading, isError: chatError } = useChat(conversationId)
    const { data: messages, isPending: messagesLoading, isError: messagesError } = useMessages(conversationId)
    const { mutate: sendMessage, isPending: isSending } = useSendMessage()

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    if (!canView) return <Unauthorized />


    if (chatLoading || messagesLoading) {
        return (
            <div className="flex flex-col h-[400px] w-full items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">جاري جلب تفاصيل المحادثة...</p>
            </div>
        )
    }

    if (chatError || messagesError || !conversation) {
        return <ErrorState />
    }
    const userName = conversation?.userName || 'مستخدم غير معروف'
    const initials = userName !== 'مستخدم غير معروف'
        ? userName.split(' ').map(n => n[0]).join('').substring(0, 2)
        : 'U';

    const handleSendMessage = (messageText: string) => {
        if (conversationId) {
            sendMessage(
                { chatId: conversationId, message: messageText },
                {
                    onError: (error: any) => {
                        toast.error(error.message || "فشل إرسال الرسالة")
                    }
                }
            )
        }
    }

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
                    customerName={userName}
                    customerInitials={initials}
                    conversationId={conversation.userId || conversation.id}
                />

                <div className="min-h-0 flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6">
                    {messages.length ? (
                        <div className="mx-auto flex max-w-5xl flex-col gap-4">
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    ) : (
                        <EmptyConversationState title="لا توجد رسائل بعد" />
                    )}
                </div>

                <ChatInput onSendMessage={handleSendMessage} isSending={isSending} />
            </div>
        </div>
    )
}

export default ConversationDetailsPage
