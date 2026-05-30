import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import DashboardEmptyState from "../components/DashboardEmptyState"
import type { WeeklyActivityDay } from "../types/dashboard"

type SystemActivityChartProps = {
  data?: WeeklyActivityDay[]
}

const chartConfig = {
  total: {
    label: "إجمالي العمليات",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const SystemActivityChart = ({ data = [] }: SystemActivityChartProps) => {
  const chartData = data.map((item) => ({
    label: item.day ?? item.date ?? "-",
    created: item.created ?? 0,
    updated: item.updated ?? 0,
    deleted: item.deleted ?? 0,
    total: item.total ?? 0,
  }))
  const hasData = chartData.some(
    (item) => item.total > 0 || item.created > 0 || item.updated > 0 || item.deleted > 0
  )

  if (!hasData) {
    return <DashboardEmptyState message="لا توجد عمليات مسجلة لهذا الأسبوع" />
  }

  return (
    <ChartContainer config={chartConfig} className="h-56 w-full">
      <BarChart accessibilityLayer data={chartData} margin={{ top: 18, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(_value, _name, _item, _index, payload) => {
                const activity = payload as unknown as (typeof chartData)[number]

                return (
                  <div className="min-w-36 space-y-2 text-right">
                    <div className="flex items-center justify-between gap-4 font-bold">
                      <span>{activity.total}</span>
                      <span>إجمالي العمليات</span>
                    </div>
                    <div className="grid gap-1 text-muted-foreground">
                      <div className="flex items-center justify-between gap-4">
                        <span>{activity.created}</span>
                        <span>إنشاء</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>{activity.updated}</span>
                        <span>تعديل</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>{activity.deleted}</span>
                        <span>حذف</span>
                      </div>
                    </div>
                  </div>
                )
              }}
            />
          }
        />
        <Bar dataKey="total" fill="var(--color-total)" radius={[8, 8, 8, 8]} />
      </BarChart>
    </ChartContainer>
  )
}

export default SystemActivityChart
