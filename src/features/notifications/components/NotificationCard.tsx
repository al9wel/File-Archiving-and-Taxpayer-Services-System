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
        barClass: "bg-chart-3",
        badgeClass: "bg-chart-3/10 text-chart-3 border-chart-3/30 dark:bg-chart-3/20 dark:text-chart-3/80 dark:border-chart-3/40",
    },
    ForSystemUsers: {
        label: "مستخدمي النظام",
        icon: ShieldAlert,
        barClass: "bg-chart-6",
        badgeClass: "bg-chart-6/10 text-chart-6 border-chart-6/30 dark:bg-chart-6/20 dark:text-chart-6/80 dark:border-chart-6/40",
    },
    ForTaxPayers: {
        label: "المكلفين",
        icon: Users,
        barClass: "bg-chart-4",
        badgeClass: "bg-chart-4/10 text-chart-4 border-chart-4/30 dark:bg-chart-4/20 dark:text-chart-4/80 dark:border-chart-4/40",
    },
    Special: {
        label: "خاص",
        icon: User,
        barClass: "bg-chart-1",
        badgeClass: "bg-chart-1/10 text-chart-1 border-chart-1/30 dark:bg-chart-1/20 dark:text-chart-1/80 dark:border-chart-1/40",
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
