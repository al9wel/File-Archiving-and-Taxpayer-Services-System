import { Label, Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import DashboardEmptyState from "../components/DashboardEmptyState"
import type { DepartmentStatistics } from "../types/dashboard"

type DepartmentDistributionPieChartProps = {
  departments?: DepartmentStatistics[]
}

const chartColors = [
  "var(--chart-2)",
  "var(--primary)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

const DepartmentDistributionPieChart = ({ departments = [] }: DepartmentDistributionPieChartProps) => {
  const chartData = departments.map((department, index) => ({
    key: `department_${department.department_id ?? index}`,
    name: department.department_name ?? "قسم غير محدد",
    value: department.files_statistics?.total_files ?? 0,
    fill: chartColors[index % chartColors.length],
  }))
  const total = chartData.reduce((sum, item) => sum + item.value, 0)
  const hasData = chartData.some((item) => item.value > 0)
  const chartConfig = chartData.reduce<ChartConfig>((config, item) => {
    config[item.key] = {
      label: item.name,
      color: item.fill,
    }
    return config
  }, {})

  if (!hasData) {
    return <DashboardEmptyState message="لا توجد ملفات موزعة على الأقسام" />
  }

  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="name" />} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={64}
            outerRadius={110}
            paddingAngle={5}
            cornerRadius={2}
            strokeWidth={8}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {total}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 30}
                        className="fill-muted-foreground text-sm"
                      >
                        ملف
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="space-y-5">
        {chartData.map((item) => (
          <div key={item.key} className="flex items-center justify-right gap-3">
            <span className="size-4 rounded-full" style={{ backgroundColor: item.fill }} />
            <div className="flex items-center gap-3 text-right">
              <span className="text-sm font-bold text-foreground/75">{item.name}</span>
              <span className="font-bold text-muted-foreground">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DepartmentDistributionPieChart
