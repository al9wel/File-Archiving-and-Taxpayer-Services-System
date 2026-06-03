import DashboardHeader from "@/components/layout/DahsboardHeader"
import { useNotification } from "../hooks/useNotification"
import { useParams, useNavigate } from "react-router-dom"
import { Loader2, User as UserIcon, Phone, ShieldAlert, ArrowRight, Pencil, Bell, AlignLeft, Hash, Users, Globe, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ROUTES } from "@/constants/routes"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import ErrorState from "@/app/pages/ErrorState"

const notificationTypeConfig = {
    General: {
        label: "عام",
        icon: Globe,
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
        icon: Bell,
        barClass: "bg-rose-500",
        badgeClass: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800",
    },
}

const ShowNotification = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: notification, isPending, isError } = useNotification(id!)
    const canUpdate = usePermission(ACTIONS.UPDATE_NOTIFICATION)

    if (isError) {
        return <ErrorState />
    }

    if (isPending) {
        return (
            <div className="flex flex-col h-[400px] w-full items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">جاري جلب تفاصيل الإشعار...</p>
            </div>
        )
    }

    const data = notification?.data
    const typeMeta = data ? notificationTypeConfig[data.notificationType] : notificationTypeConfig.General
    const TypeIcon = typeMeta.icon
    const senderName = data?.sendBy ? `${data.sendBy.firstName} ${data.sendBy.lastName}`.trim() : ""

    const details = [
        { label: "رقم الإشعار", value: data?.id, icon: Hash },
        { label: "نوع الإشعار", value: typeMeta.label, icon: TypeIcon },
        { label: "رقم هاتف المستلم", value: data?.receiverPhone, icon: Phone, ltr: true },
        { label: "الدور", value: data?.sendBy?.role, icon: ShieldAlert },
        { label: "القسم", value: data?.sendBy?.departmentName || data?.sendBy?.department?.name, icon: Building2 },
    ]

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title="تفاصيل الإشعار"
                    desc={`عرض بيانات الإشعار: ${data?.title}`}
                />
            </div>

            <div className="container mx-auto px-3 py-6 animate-in fade-in duration-500 space-y-5" dir="rtl">
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => navigate(ROUTES.DASHBOARD.NOTIFICATIONS)}
                        className="h-11 rounded-xl px-5 font-bold cursor-pointer"
                    >
                        <ArrowRight className="ml-2 h-4 w-4" />
                        رجوع
                    </Button>
                    {canUpdate && (
                        <Button
                            onClick={() => navigate(ROUTES.DASHBOARD.NOTIFICATIONS_EDIT.replace(":id", id!))}
                            className="h-11 rounded-xl px-6 font-bold hover:bg-primary-hover cursor-pointer shadow-sm"
                        >
                            <Pencil className="ml-2 h-4 w-4" />
                            تعديل الإشعار
                        </Button>
                    )}
                </div>

                <Card className="rounded-2xl border border-border shadow-sm overflow-hidden relative">
                    <div className={`absolute top-0 right-0 left-0 h-1.5 ${typeMeta.barClass}`} />
                    <CardContent className="p-5 pt-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                            <div className="flex items-start gap-4 min-w-0">
                                <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <TypeIcon size={28} />
                                </div>
                                <div className="min-w-0 space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-xs font-extrabold border ${typeMeta.badgeClass}`}>
                                            {typeMeta.label}
                                        </Badge>
                                        <span className="text-xs font-bold text-muted-foreground">#{data?.id}</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-foreground break-words">{data?.title}</h2>
                                    <p className="text-sm text-muted-foreground font-bold">
                                        {senderName ? `أرسل بواسطة ${senderName}` : "معلومات المرسل غير متوفرة"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5 pb-8">
                    <Card className="rounded-2xl border border-border shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <AlignLeft size={20} />
                                </div>
                                <h3 className="text-lg font-black text-foreground">محتوى الإشعار</h3>
                            </div>
                            <div className="rounded-xl bg-muted/20 border border-border/70 p-4 text-sm leading-7 text-foreground/85 min-h-[140px] whitespace-pre-wrap">
                                {data?.description || "غير متوفر"}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-5">
                        <Card className="rounded-2xl border border-border shadow-sm">
                            <CardContent className="p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <UserIcon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-foreground">بيانات المرسل</h3>
                                        <p className="text-xs text-muted-foreground font-bold">{senderName || "غير متوفر"}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    {details.map((item) => (
                                        <div key={item.label} className="flex items-center gap-3 rounded-xl bg-muted/20 border border-border/60 px-3 py-2.5">
                                            <item.icon size={16} className="text-muted-foreground/70 shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-muted-foreground font-bold">{item.label}</p>
                                                <p className="font-black text-foreground truncate" dir={item.ltr ? "ltr" : "rtl"}>
                                                    {item.value || "غير متوفر"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowNotification
