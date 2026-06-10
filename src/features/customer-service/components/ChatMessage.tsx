import { cn } from "@/lib/utils"
import type { Message } from "@/types/CustomerService"

interface ChatMessageProps {
    message: Message
}

const ChatMessage = ({ message }: ChatMessageProps) => {
    const isCustomer = message.senderType === "user"

    const timeStr = message.createdAt
        ? message.createdAt.toDate().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        : '';

    return (
        <div className={cn("flex w-full", isCustomer ? "justify-end" : "justify-start")}>
            <div
                className={cn(
                    "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm md:max-w-[62%]",
                    isCustomer
                        ? "rounded-tl-md border border-border bg-card text-card-foreground"
                        : " rounded-tr-md bg-primary text-primary-foreground"
                )}
            >
                <p className="whitespace-pre-wrap">{message.message}</p>
                <div className={cn("mt-2 text-[11px] font-bold", isCustomer ? " text-muted-foreground" : "text-primary-foreground/75")}>
                    {timeStr}
                </div>
            </div>
        </div>
    )
}

export default ChatMessage
