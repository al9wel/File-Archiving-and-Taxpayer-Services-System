import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/constants/routes"
import type { Chat } from "@/types/CustomerService"
import { CalendarClock, ChevronLeft, Hash, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

interface ConversationCardProps {
    conversation: Chat
}

const ConversationCard = ({ conversation }: ConversationCardProps) => {
    // Generate initials from userName (fallback to U if empty)
    const initials = conversation.userName
        ? conversation.userName.split(' ').map(n => n[0]).join('').substring(0, 2)
        : 'U';
    
    // Format timestamp
    const dateStr = conversation.updatedAt 
        ? conversation.updatedAt.toDate().toLocaleDateString('ar-EG') 
        : '';

    return (
        <Link to={`${ROUTES.DASHBOARD.CUSTOMER_SERVICE.ROOT}/${conversation.id}`} className="group block h-full">
            <Card className="relative h-full overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg dark:hover:border-primary/35">
                <CardContent className="flex h-full flex-col p-5 pt-6 text-right">
                    <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <Avatar size="lg" className="bg-primary/10">
                                <AvatarFallback className="bg-primary/10 font-black text-primary">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <h3 className="truncate text-base font-black text-foreground transition-colors group-hover:text-primary">
                                    {conversation.userName || 'مستخدم غير معروف'}
                                </h3>
                                <div className="mt-1 flex items-center gap-1 text-xs font-bold text-muted-foreground">
                                    <Hash size={13} />
                                    <span className="font-mono">{conversation.userId || conversation.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                        {conversation.lastMessage || 'لا يوجد رسائل'}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-border/80 pt-4">
                        <div className="flex min-w-0 items-center gap-2 text-xs font-bold text-muted-foreground">
                            <CalendarClock size={14} className="shrink-0 text-muted-foreground/60" />
                            <span className="truncate">{dateStr}</span>
                        </div>
                        <div className="flex items-center gap-2">
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
