import type { Notification } from "@/types/Notification"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Hash, Phone, ShieldAlert, User, Users } from "lucide-react"
import { NotificationActions } from "./NotificationActions"

interface NotificationCardProps {
    notification: Notification
}

const notificationTypeConfig = {
    General: {
        label: "عام",
        icon: Bell,
        barClass: "bg-sky-500",
        badgeClass: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:border-sky-800",
    },
    ForSystemUsers: {
        label: "مستخدمي النظام",
        icon: ShieldAlert,
        barClass: "bg-violet-500",
        badgeClass: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800",
    },
    ForTaxPayers: {
        label: "المكلفين",
        icon: Users,
        barClass: "bg-emerald-500",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800",
    },
    Special: {
        label: "خاص",
        icon: User,
        barClass: "bg-rose-500",
        badgeClass: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800",
    },
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
    const typeMeta = notificationTypeConfig[notification.notificationType] || {
        label: notification.notificationType,
        icon: Bell,
        barClass: "bg-slate-400",
        badgeClass: "bg-muted text-muted-foreground border-border",
    }
    const TypeIcon = typeMeta.icon
    const senderName = notification.sendBy
        ? `${notification.sendBy.firstName} ${notification.sendBy.lastName}`.trim()
        : ""

    return (
        <Card className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/20 dark:hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative flex flex-col h-full" dir="rtl">
            <div className={`absolute top-0 right-0 left-0 h-1 ${typeMeta.barClass}`} />

            <CardContent className="p-4 pt-5 text-right flex flex-col h-full">
                <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1 min-w-0">
                        <Hash size={13} className="shrink-0" />
                        <span className="font-mono text-foreground font-black truncate">#{notification.id}</span>
                    </span>
                    <Badge variant="outline" className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold border shrink-0 ${typeMeta.badgeClass}`}>
                        {typeMeta.label}
                    </Badge>
                </div>

                <h3 className="text-base font-black text-foreground mb-3 hover:text-primary transition-colors line-clamp-1" title={notification.title}>
                    {notification.title}
                </h3>

                <div className="space-y-2 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                        <TypeIcon size={14} className="text-muted-foreground/60 shrink-0" />
                        <span className="truncate">
                            النوع: <strong className="text-foreground/80 font-bold">{typeMeta.label}</strong>
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User size={14} className="text-muted-foreground/60 shrink-0" />
                        <span className="truncate">
                            {senderName || "مرسل غير متوفر"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldAlert size={14} className="text-muted-foreground/60 shrink-0" />
                        <span className="truncate">{notification.sendBy?.role || "الدور غير متوفر"}</span>
                    </div>
                    {notification.notificationType === "Special" && notification.receiverPhone && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-muted-foreground/60 shrink-0" />
                            <span className="font-mono truncate" dir="ltr">{notification.receiverPhone}</span>
                        </div>
                    )}
                </div>

                <p className="text-xs text-foreground/75 line-clamp-2 leading-5 mb-4">
                    {notification.description || "لا يوجد وصف"}
                </p>

                <div className="border-t border-dashed border-border/80 pt-3 mt-auto flex items-center justify-end">
                    <NotificationActions notification={notification} />
                </div>
            </CardContent>
        </Card>
    )
}
