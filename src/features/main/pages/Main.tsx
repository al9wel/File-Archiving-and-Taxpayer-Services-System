import { Archive, BarChart3, Clock3, LineChart } from "lucide-react"

import ErrorState from "@/app/pages/ErrorState"
import ChartPanel from "../components/ChartPanel"
// import DashboardHeader from "../components/DashboardHeader"
import DashboardLoading from "../components/DashboardLoading"
import StatisticsCards from "../components/StatisticsCards"
import DepartmentComparisonAreaChart from "../charts/DepartmentComparisonAreaChart"
import DepartmentDistributionPieChart from "../charts/DepartmentDistributionPieChart"
import FileMovementBarChart from "../charts/FileMovementBarChart"
import FilesByTypePieChart from "../charts/FilesByTypePieChart"
import SystemActivityChart from "../charts/SystemActivityChart"
import { useDashboardStatistics } from "../hooks/useDashboardStatistics"
import Unauthorized from "@/app/pages/Unauthorized"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import DashboardHeader from "@/components/layout/DahsboardHeader"

const Main = () => {
  const { data, isPending, isError } = useDashboardStatistics()
  const canView = usePermission(ACTIONS.VIEW_DASHBOARD)
  if (!canView) return <Unauthorized />
  if (isError) {
    return <ErrorState />
  }
  if (isPending) {
    return <DashboardLoading />
  }


  return (
    <>
      <div className="w-full px-3 pt-3">
        <DashboardHeader mb="mb-2" title=" الرئيسية " desc=" نظرة عامة عن الإحصائيات والأداء" />
      </div>
      <div className=" mx-auto flex w-full flex-col gap-5 px-3 py-3 animate-in fade-in duration-500">
        <StatisticsCards statistics={data.data} />

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.8fr]">
          <ChartPanel
            title="أنواع الملفات"
            description="توزيع الملفات حسب نوع المكلف"
            sectionLabel="الملفات"
            icon={Clock3}
            footer={`إجمالي الملفات: ${data?.data?.files_statistics?.total_files_count ?? 0}`}
          >
            <FilesByTypePieChart statistics={data?.data?.files_statistics} />
          </ChartPanel>

          <ChartPanel
            title="حركة الملفات الشهرية"
            description="حالة حركة الملفات خلال آخر ستة أشهر"
            sectionLabel="حركة الملفات"
            icon={BarChart3}
            footer={`إجمالي الحركة: ${data?.data?.file_movements_statistics?.file_movement_count}`}
          >
            <FileMovementBarChart data={data?.data?.file_movements_statistics?.last_6_months_statistics?.monthly_breakdown} />
          </ChartPanel>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[0.8fr_1.25fr]">
          <ChartPanel
            title="حركة العمل داخل النظام"
            description={`نشاط العمليات من ${data.data.weekly_activity_statistics?.week_start ?? "-"} إلى ${data.data.weekly_activity_statistics?.week_end ?? "-"}`}
            sectionLabel="عمليات النظام"
            icon={BarChart3}
            footer={`إجمالي عمليات الأسبوع: ${data.data.weekly_activity_statistics?.week_total ?? 0}`}
          >
            <SystemActivityChart data={data.data.weekly_activity_statistics?.days} />
          </ChartPanel>

          <ChartPanel
            title="توزيع الملفات بين الأقسام"
            description="عدد الملفات المسجلة في كل قسم"
            sectionLabel="الأقسام"
            icon={Archive}
            footer={`عدد الأقسام: ${data.data?.overview?.departments_count ?? 0}`}
          >
            <DepartmentDistributionPieChart departments={data.data?.departments_statistics} />
          </ChartPanel>
        </section>

        <ChartPanel
          title="مقارنة حركة الملفات بين الأقسام"
          description="مقارنة حركة الملفات اليومية بين الأقسام المتصدرة"
          sectionLabel="الملفات"
          icon={LineChart}
        >
          <DepartmentComparisonAreaChart data={data.data.file_movements_statistics?.top_departments_statistics} />
        </ChartPanel>
      </div>
    </>
  )
}

export default Main
