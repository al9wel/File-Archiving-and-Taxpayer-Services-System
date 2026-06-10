import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Hash } from "lucide-react"

interface ChatHeaderProps {
    customerName: string
    customerInitials: string
    conversationId: string
}

const ChatHeader = ({ customerName, customerInitials, conversationId }: ChatHeaderProps) => {
    return (
        <div className="flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/80 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
                <Avatar size="lg" className="bg-primary/10">
                    <AvatarFallback className="bg-primary/10 font-black text-primary">
                        {customerInitials}
                    </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-base font-black text-foreground md:text-lg">{customerName}</h2>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs font-bold text-muted-foreground">
                        <Hash size={13} />
                        <span className="font-mono">{conversationId}</span>
                    </div>
                </div>
            </div>
            {/* <Button variant="ghost" size="icon" type="button" aria-label="المزيد">
                <MoreHorizontal />
            </Button> */}
        </div>
    )
}

export default ChatHeader
