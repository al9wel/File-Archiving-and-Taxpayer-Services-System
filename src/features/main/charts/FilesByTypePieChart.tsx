import { Label, Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import DashboardEmptyState from "../components/DashboardEmptyState"
import type { FilesStatistics } from "../../../types/Dashboard"

type FilesByTypePieChartProps = {
  statistics?: FilesStatistics
}

const chartConfig = {
  individual: {
    label: "ملفات الأفراد",
    color: "var(--chart-2)",
  },
  company: {
    label: "ملفات الشركات",
    color: "var(--chart-3)",
  },
  charity: {
    label: "ملفات الشركات الخيرية",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const FilesByTypePieChart = ({ statistics }: FilesByTypePieChartProps) => {
  const total = statistics?.total_files_count ?? 0
  const chartData = [
    {
      key: "individual",
      name: "ملفات الأفراد",
      value: statistics?.individual_files_count ?? 0,
      fill: "var(--color-chart-2)",
    },
    {
      key: "company",
      name: "ملفات الشركات",
      value: statistics?.company_files_count ?? 0,
      fill: "var(--color-chart-3)",
    },
    {
      key: "charity",
      name: "ملفات الشركات الخيرية",
      value: statistics?.charitable_company_files_count ?? 0,
      fill: "var(--color-primary)",
    },
  ]
  const hasData = chartData.some((item) => item.value > 0)

  if (!hasData) {
    return <DashboardEmptyState message="لا توجد بيانات ملفات متاحة" />
  }

  return (
    <div className="grid items-center gap-4 lg:grid-cols-[1.1fr_0.9fr]">

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
      <div className="space-y-4">
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

export default FilesByTypePieChart
