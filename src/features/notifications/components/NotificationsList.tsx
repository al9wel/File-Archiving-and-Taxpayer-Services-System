import { useMemo, useState } from "react"
import type { Notification } from "@/types/Notification"
import { NotificationCard } from "./NotificationCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, BellOff, Plus } from "lucide-react"
import { NavLink } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"

interface NotificationsListProps {
    notifications: Notification[]
}

const notificationTypeOptions = [
    { value: "", label: "الكل" },
    { value: "General", label: "عام" },
    { value: "ForSystemUsers", label: "مستخدمين" },
    { value: "ForTaxPayers", label: "مكلفين" },
    { value: "Special", label: "خاص" },
]

export const NotificationsList = ({ notifications }: NotificationsListProps) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [notificationType, setNotificationType] = useState("")
    const canCreate = usePermission(ACTIONS.CREATE_NOTIFICATION)

    const filteredNotifications = useMemo(
        () => notifications.filter((notification) =>
            notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!notificationType || notification.notificationType === notificationType)
        ),
        [notifications, searchQuery, notificationType]
    )

    return (
        <div className="space-y-6 text-right" dir="rtl">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border border-border shadow-sm">
                <h2 className="text-xl font-black text-foreground">الإشعارات</h2>
                <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,1fr)_340px] xl:grid-cols-[minmax(280px,1fr)_340px_auto] gap-2 w-full lg:max-w-5xl">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">البحث بعنوان الإشعار</label>
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                            <Input
                                type="text"
                                placeholder="البحث بعنوان الإشعار"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pr-10 rounded-xl h-11 border-border bg-background focus-visible:ring-primary focus-visible:border-primary font-bold placeholder:text-muted-foreground/60"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">نوع الإشعار</label>
                        <div className="grid grid-cols-5 rounded-xl bg-muted/30 p-1 h-11">
                            {notificationTypeOptions.map((option) => (
                                <button
                                    key={option.value || "all"}
                                    type="button"
                                    onClick={() => setNotificationType(option.value)}
                                    className={`rounded-lg px-2 text-xs font-bold transition-colors cursor-pointer ${notificationType === option.value
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {canCreate && (
                        <div className="space-y-2">
                            <span className="hidden xl:block text-xs font-bold text-transparent select-none">إجراء</span>
                            <NavLink to={ROUTES.DASHBOARD.NOTIFICATIONS_CREATE} className="block">
                                <Button className="w-full md:w-auto h-11 px-5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground shadow-sm cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95">
                                    <Plus className="h-5 w-5" />
                                    <span className="font-bold whitespace-nowrap">إضافة إشعار</span>
                                </Button>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

            {filteredNotifications.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 animate-in fade-in duration-300">
                    {filteredNotifications.map((notification) => (
                        <NotificationCard key={notification.id} notification={notification} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed rounded-3xl bg-muted/10 space-y-4">
                    <BellOff className="text-muted-foreground/50" size={56} />
                    <h3 className="text-lg font-black text-foreground/80">لا توجد نتائج</h3>
                    <p className="text-muted-foreground text-sm max-w-xs text-center font-bold">
                        {searchQuery || notificationType ? "لم نعثر على أي إشعارات مطابقة لبحثك." : "لا توجد أي إشعارات حالياً."}
                    </p>
                </div>
            )}
        </div>
    )
}
