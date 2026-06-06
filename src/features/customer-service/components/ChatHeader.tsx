import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { ConversationStatus } from "../types/CustomerService"
import { Hash, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatHeaderProps {
    customerName: string
    customerInitials: string
    conversationId: string
    status: ConversationStatus
}

const statusConfig: Record<ConversationStatus, { label: string; badgeClass: string; dotClass: string }> = {
    Open: {
         label: "مفتوحة",
         badgeClass: "bg-chart-4/10 text-chart-4 border-chart-4/30 dark:bg-chart-4/20 dark:text-chart-4/80 dark:border-chart-4/40",
         dotClass: "bg-chart-4",
     },
     Pending: {
         label: "قيد الانتظار",
         badgeClass: "bg-chart-5/10 text-chart-5 border-chart-5/30 dark:bg-chart-5/20 dark:text-chart-5/80 dark:border-chart-5/40",
         dotClass: "bg-chart-5",
     },
     Closed: {
         label: "مغلقة",
         badgeClass: "bg-muted text-muted-foreground border-border dark:bg-muted/20 dark:text-muted-foreground dark:border-border",
         dotClass: "bg-muted-foreground/50",
     },
}

const ChatHeader = ({ customerName, customerInitials, conversationId, status }: ChatHeaderProps) => {
    const statusMeta = statusConfig[status]

    return (
        <div className="flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/80 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
                <Avatar size="lg" className="bg-primary/10">
                    <AvatarFallback className="bg-primary/10 font-black text-primary">
                        {customerInitials}
                    </AvatarFallback>
                    <AvatarBadge className={statusMeta.dotClass} />
                </Avatar>
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-base font-black text-foreground md:text-lg">{customerName}</h2>
                        <Badge variant="outline" className={`rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold ${statusMeta.badgeClass}`}>
                            {statusMeta.label}
                        </Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs font-bold text-muted-foreground">
                        <Hash size={13} />
                        <span className="font-mono">{conversationId}</span>
                    </div>
                </div>
            </div>
            <Button variant="ghost" size="icon" type="button" aria-label="المزيد">
                <MoreHorizontal />
            </Button>
        </div>
    )
}

export default ChatHeader
