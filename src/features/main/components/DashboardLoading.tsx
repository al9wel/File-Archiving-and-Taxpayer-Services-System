import { Skeleton } from "@/components/ui/skeleton"
import DashboardHeader from "@/components/layout/DahsboardHeader"

const DashboardLoading = () => {
  return (
    <>
      <div className="w-full px-3 pt-3">
        <DashboardHeader
          mb="mb-2"
          title=" الرئيسية "
          desc=" نظرة عامة عن الإحصائيات والأداء"
        />
      </div>

      <div className="container mx-auto flex w-full flex-col gap-5 px-3 py-3">
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-24 rounded-xl" />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.8fr]">
          <Skeleton className="h-[26rem] rounded-xl" />
          <Skeleton className="h-[26rem] rounded-xl" />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.8fr_1.25fr]">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>

        <Skeleton className="h-[28rem] rounded-xl" />
      </div>
    </>
  )
}

export default DashboardLoading
