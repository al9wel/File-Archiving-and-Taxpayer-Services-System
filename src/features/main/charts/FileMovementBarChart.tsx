import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import DashboardEmptyState from "../components/DashboardEmptyState"
import type { MonthlyFileMovement } from "../../../types/Dashboard"

type FileMovementBarChartProps = {
  data?: MonthlyFileMovement[]
}

const chartConfig = {
  total: {
    label: "إجمالي الحركة",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const monthNames: Record<string, string> = {
  January: "يناير",
  February: "فبراير",
  March: "مارس",
  April: "أبريل",
  May: "مايو",
  June: "يونيو",
  July: "يوليو",
  August: "أغسطس",
  September: "سبتمبر",
  October: "أكتوبر",
  November: "نوفمبر",
  December: "ديسمبر",
}

const formatMonthLabel = (monthName?: string, month?: string) => {
  if (!monthName) {
    return month ?? "-"
  }
  return monthName.replace(monthName.split(" ")[0], monthNames[monthName.split(" ")[0]])
}

const FileMovementBarChart = ({ data = [] }: FileMovementBarChartProps) => {
  const chartData = data.map((item) => ({
    label: formatMonthLabel(item.month_name, item.month),
    inside_archive: item.inside_archive ?? 0,
    outside_archive: item.outside_archive ?? 0,
    missing: item.missing ?? 0,
    total: item.total ?? 0,
  }))
  const hasData = chartData.some(
    (item) => item.total > 0 || item.inside_archive > 0 || item.outside_archive > 0 || item.missing > 0
  )

  if (!hasData) {
    return <DashboardEmptyState message="لا توجد حركة ملفات خلال الفترة" />
  }

  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <BarChart accessibilityLayer data={chartData} margin={{ top: 18, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} tickMargin={10} axisLine={false} interval={0} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(_value, _name, _item, _index, payload) => {
                const movement = payload as unknown as (typeof chartData)[number]

                return (
                  <div className="min-w-36 space-y-2 text-right">
                    <div className="flex items-center justify-between gap-4 font-bold">
                      <span>{movement.total}</span>
                      <span>إجمالي الحركة</span>
                    </div>
                    <div className="grid gap-1 text-muted-foreground">
                      <div className="flex items-center justify-between gap-4">
                        <span>{movement.inside_archive}</span>
                        <span>داخل الأرشيف</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>{movement.outside_archive}</span>
                        <span>خارج الأرشيف</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>{movement.missing}</span>
                        <span>مفقود</span>
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

export default FileMovementBarChart
