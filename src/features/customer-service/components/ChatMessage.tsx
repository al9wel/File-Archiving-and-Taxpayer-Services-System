import { cn } from "@/lib/utils"
import type { CustomerServiceMessage } from "../types/CustomerService"

interface ChatMessageProps {
    message: CustomerServiceMessage
}

const ChatMessage = ({ message }: ChatMessageProps) => {
    const isCustomer = message.sender === "customer"

    return (
        <div className={cn("flex w-full", isCustomer ? "justify-end" : "justify-start")}>
            <div
                className={cn(
                    "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm md:max-w-[62%]",
                    isCustomer
                        ? "rounded-tr-md bg-primary text-primary-foreground"
                        : "rounded-tl-md border border-border bg-card text-card-foreground"
                )}
            >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className={cn("mt-2 text-[11px] font-bold", isCustomer ? "text-primary-foreground/75" : "text-muted-foreground")}>
                    {message.time}
                </div>
            </div>
        </div>
    )
}

export default ChatMessage
