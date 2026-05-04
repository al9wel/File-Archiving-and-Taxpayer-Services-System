import DashboardHeader from "@/components/layout/DahsboardHeader"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { useOperationReports } from "../hooks/useOperationReports"
import { Loader2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Operations Reports Page.
 * Displays system activity logs in a DataTable with filtering and read-only access.
 */
const OperationReports = () => {
    const { data, isLoading, isError } = useOperationReports()
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <p className="text-red-600 font-bold">حدث خطأ أثناء تحميل البيانات</p>
                <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
            </div>
        );
    }
    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title="تقارير العمليات"
                    desc="مراقبة ومتابعة جميع العمليات والأنشطة في النظام"
                />
            </div>

            <div className="container mx-auto px-3 animate-in fade-in duration-500 space-y-6">
                {isLoading ? (
                    <div className="flex h-[300px] items-center justify-center">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                ) : (
                    <>
                        <DataTable columns={columns} data={data?.data || []} />

                        {/* Download Report Button - Matching the design image */}
                        <div className="flex justify-center pt-4 pb-10">
                            <Button
                                className="w-full max-w-2xl h-14 rounded-2xl bg-[#911111] hover:bg-[#7a0e0e] text-white shadow-xl shadow-[#911111]/20 flex items-center justify-center gap-3 text-lg font-bold transition-all active:scale-[0.98]"
                                onClick={() => alert("سيتم تنفيذ ميزة تحميل التقارير قريباً")}
                            >
                                <Download className="size-6" />
                                <span>تحميل التقرير</span>
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default OperationReports
