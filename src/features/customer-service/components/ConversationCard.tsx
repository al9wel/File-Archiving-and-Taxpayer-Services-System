import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/constants/routes"
import type { CustomerServiceConversation, ConversationStatus } from "../types/CustomerService"
import { CalendarClock, ChevronLeft, Hash, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

interface ConversationCardProps {
    conversation: CustomerServiceConversation
}

const statusConfig: Record<ConversationStatus, { label: string; barClass: string; badgeClass: string }> = {
    Open: {
        label: "مفتوحة",
        barClass: "bg-emerald-500",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800",
    },
    Pending: {
        label: "قيد الانتظار",
        barClass: "bg-amber-500",
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
    },
    Closed: {
        label: "مغلقة",
        barClass: "bg-slate-400",
        badgeClass: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800",
    },
}

const ConversationCard = ({ conversation }: ConversationCardProps) => {
    const statusMeta = statusConfig[conversation.status]

    return (
        <Link to={`${ROUTES.DASHBOARD.CUSTOMER_SERVICE.ROOT}/${conversation.id}`} className="group block h-full">
            <Card className="relative h-full overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg dark:hover:border-primary/35">
                <div className={`absolute inset-x-0 top-0 h-1 ${statusMeta.barClass}`} />
                <CardContent className="flex h-full flex-col p-5 pt-6 text-right">
                    <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <Avatar size="lg" className="bg-primary/10">
                                <AvatarFallback className="bg-primary/10 font-black text-primary">
                                    {conversation.customerInitials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <h3 className="truncate text-base font-black text-foreground transition-colors group-hover:text-primary">
                                    {conversation.customerName}
                                </h3>
                                <div className="mt-1 flex items-center gap-1 text-xs font-bold text-muted-foreground">
                                    <Hash size={13} />
                                    <span className="font-mono">{conversation.id}</span>
                                </div>
                            </div>
                        </div>
                        <Badge variant="outline" className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold ${statusMeta.badgeClass}`}>
                            {statusMeta.label}
                        </Badge>
                    </div>

                    <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                        {conversation.lastMessage}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-border/80 pt-4">
                        <div className="flex min-w-0 items-center gap-2 text-xs font-bold text-muted-foreground">
                            <CalendarClock size={14} className="shrink-0 text-muted-foreground/60" />
                            <span className="truncate">{conversation.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {conversation.unreadCount > 0 && (
                                <Badge className="min-w-6 rounded-full px-2 py-0.5 text-xs font-black">
                                    {conversation.unreadCount}
                                </Badge>
                            )}
                            <span className="flex items-center gap-1 text-xs font-extrabold text-primary transition-transform duration-200 group-hover:-translate-x-1">
                                <MessageCircle size={14} />
                                <ChevronLeft size={14} />
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default ConversationCard
