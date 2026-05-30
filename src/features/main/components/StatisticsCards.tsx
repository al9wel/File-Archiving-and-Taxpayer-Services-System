import {
  Activity,
  Archive,
  FileArchive,
  Users,
  UserStar,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import type { DashboardStatistics } from "../types/dashboard"

type StatisticsCardsProps = {
  statistics?: DashboardStatistics
}

const StatisticsCards = ({ statistics }: StatisticsCardsProps) => {
  const stats = [
    {
      title: "إجمالي الملفات",
      value: statistics?.files_statistics?.total_files_count,
      icon: FileArchive,
      iconClassName: "text-red-600",
      iconWrapperClassName: "bg-red-100 dark:bg-red-950/40",
    },
    {
      title: "المستخدمين",
      value: statistics?.users_statistics?.total_users_count?.total_users,
      icon: Users,
      iconClassName: "text-blue-600",
      iconWrapperClassName: "bg-blue-100 dark:bg-blue-950/40",
    },
    {
      title: " المأمورين",
      value: statistics?.users_statistics?.total_users_count?.tax_collector_count,
      icon: UserStar,
      iconClassName: "text-teal-600",
      iconWrapperClassName: "bg-teal-100 dark:bg-teal-950/40",
    },
    {
      title: "الأقسام",
      value: statistics?.overview?.departments_count,
      icon: Archive,
      iconClassName: "text-emerald-600",
      iconWrapperClassName: "bg-emerald-100 dark:bg-emerald-950/40",
    },
    {
      title: "الأنشطة",
      value: statistics?.overview?.activities_types_count,
      icon: Activity,
      iconClassName: "text-violet-600",
      iconWrapperClassName: "bg-violet-100 dark:bg-violet-950/40",
    },
  ]

  return (
    <section className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card key={stat.title} className="min-h-24 rounded-xl">
            <CardContent className="flex h-full flex-col justify-between gap-3 px-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-bold text-muted-foreground">{stat.title}</p>
                <div className={`rounded-xl p-2 ${stat.iconWrapperClassName}`}>
                  <Icon className={`size-5 ${stat.iconClassName}`} />
                </div>
              </div>
              <div className="flex items-end justify-between gap-3 px-2.5">
                <span className="text-xs text-muted-foreground">من بيانات النظام</span>
                <strong className="text-xl font-bold text-foreground/80">{stat.value ?? 0}</strong>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}

export default StatisticsCards
