import { Activity, Building2, CreditCard, FileCheck2, Loader2, Map, Navigation } from "lucide-react"

import ErrorState from "@/app/pages/ErrorState"
import Unauthorized from "@/app/pages/Unauthorized"
import { Card, CardContent } from "@/components/ui/card"
import { ACTIONS } from "@/constants/permissions"
import { usePermission } from "@/hooks/usePermission"
import type { DashboardOverview } from "@/types/Dashboard"
import { useBasicInfoStats } from "../hooks/basic-info/useBasicInfoStats"

const stats = [
    {
        title: "عدد الأقسام",
        value: "departments_count",
        icon: Building2,
        color: "bg-emerald-50 text-emerald-600",
        iconBg: "bg-emerald-100",
    },
    {
        title: "حالة الملف",
        value: "file_status_count",
        icon: FileCheck2,
        color: "bg-red-50 text-red-600",
        iconBg: "bg-red-100",
    },
    {
        title: "نوع النشاط",
        value: "activities_types_count",
        icon: Activity,
        color: "bg-blue-50 text-blue-600",
        iconBg: "bg-blue-100",
    },
    {
        title: "نوع السداد",
        value: "payments_types_count",
        icon: CreditCard,
        color: "bg-pink-50 text-pink-600",
        iconBg: "bg-pink-100",
    },
    {
        title: "عدد المناطق",
        value: "regions_count",
        icon: Navigation,
        color: "bg-orange-50 text-orange-600",
        iconBg: "bg-orange-100",
    },
    {
        title: "عدد الأحياء",
        value: "districts_count",
        icon: Map,
        color: "bg-gray-50 text-gray-600",
        iconBg: "bg-gray-100",
    },
] as const

const BasicInfo = () => {
    const { data: statsData, isPending, isError } = useBasicInfoStats()
    const overview = statsData?.data?.overview
    const canView = usePermission(ACTIONS.VIEW_BASIC_INFO)

    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }

    return (
        <>
            {isPending ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="animate-pulse text-muted-foreground">جاري جلب الإحصائيات الأساسية...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-500 md:grid-cols-2">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        const valueKey = stat.value as keyof DashboardOverview

                        return (
                            <Card key={stat.title} className="overflow-hidden">
                                <CardContent className="flex items-center justify-between p-4">
                                    <div className="text-right">
                                        <p className="mb-1 text-xl font-bold text-foreground/70">{stat.title}</p>
                                        <h3 className="text-2xl font-bold text-foreground/90">
                                            {overview?.[valueKey] ?? 0}
                                        </h3>
                                    </div>
                                    <div className={`rounded-xl p-3 ${stat.iconBg}`}>
                                        <Icon className={`size-6 ${stat.color.split(" ")[1]}`} />
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default BasicInfo
