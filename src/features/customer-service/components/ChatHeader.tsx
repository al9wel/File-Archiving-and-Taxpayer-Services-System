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
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800",
        dotClass: "bg-emerald-500",
    },
    Pending: {
        label: "قيد الانتظار",
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
        dotClass: "bg-amber-500",
    },
    Closed: {
        label: "مغلقة",
        badgeClass: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800",
        dotClass: "bg-slate-400",
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
