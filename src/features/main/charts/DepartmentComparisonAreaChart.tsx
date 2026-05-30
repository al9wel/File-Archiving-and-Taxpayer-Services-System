import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import DashboardEmptyState from "../components/DashboardEmptyState"
import type { TopDepartmentStatistic } from "../../../types/Dashboard"

type DepartmentComparisonAreaChartProps = {
  data?: TopDepartmentStatistic[]
}

const DepartmentComparisonAreaChart = ({ data = [] }: DepartmentComparisonAreaChartProps) => {
  const showDept2 = data.some((item) => item.dept2)
  const chartData = data.map((item) => ({
    date: item.date,
    dept1: item.dept1.value ?? 0,
    dept2: item.dept2?.value ?? 0,
  }))

  const chartConfig = {
    dept1: {
      label: data[0]?.dept1.name ?? "القسم الأول",
      color: "var(--chart-2)",
    },
    ...(showDept2 && {
      dept2: {
        label: data.find((item) => item.dept2)?.dept2?.name ?? "القسم الثاني",
        color: "var(--chart-1)",
      },
    }),
  } satisfies ChartConfig

  const hasData = chartData.some((item) => item.dept1 > 0 || item.dept2 > 0)

  if (!hasData) {
    return <DashboardEmptyState message="لا توجد حركة ملفات للأقسام خلال الفترة" />
  }

  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <AreaChart accessibilityLayer data={chartData} margin={{ top: 18, right: 8, left: 8, bottom: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={12} minTickGap={24} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Area
          dataKey="dept1"
          type="natural"
          fill="var(--color-dept1)"
          fillOpacity={0.25}
          stroke="var(--color-dept1)"
          stackId="a"
        />
        {showDept2 && (
          <Area
            dataKey="dept2"
            type="natural"
            fill="var(--color-dept2)"
            fillOpacity={0.25}
            stroke="var(--color-dept2)"
            stackId="a"
          />
        )}
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}

export default DepartmentComparisonAreaChart
