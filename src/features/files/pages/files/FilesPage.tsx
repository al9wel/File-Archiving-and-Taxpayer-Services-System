import { DataTable } from "../../components/files/data-table"
import { columns } from "../../components/files/columns"
import { useFiles } from "../../hooks/files/useFiles"
import { useFilesReports } from "../../hooks/files/useFilesReports"
import { Loader2, FileText } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

const FilesPage = () => {
    const { data, isPending, isError } = useFiles()
    const { mutateAsync: getFilesReports, isPending: isFilesReportsLoading } = useFilesReports()
    const canView = usePermission(ACTIONS.VIEW_FILE)
    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }

    const handleFilesReport = async () => {
        try {
            const response = await getFilesReports()

            const reportUrl = response?.data?.report_url

            if (!reportUrl) {
                toast.error("تعذر الحصول على رابط التقرير")
                return
            }

            window.open(
                reportUrl,
                "_blank",
                "noopener,noreferrer"
            )
        } catch (error: any) {
            toast.error(error.message || "حدث خطأ أثناء إنشاء التقرير")
        }
    }

    return (
        <>
            <div className="container mx-auto px-3 animate-in fade-in duration-500">
                {isPending ? (
                    <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <p className="text-muted-foreground animate-pulse">جاري جلب الملفات...</p>
                    </div>
                ) : (
                    <>
                        {canView && (
                            <div className="flex justify-end mb-3">
                                <Button
                                    onClick={handleFilesReport}
                                    disabled={isFilesReportsLoading}
                                    className="cursor-pointer p-4 hover:bg-primary-hover"
                                    size="lg"
                                >
                                    {isFilesReportsLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <FileText className="h-4 w-4" />
                                    )}
                                    <span className="mr-2">تقرير جميع الملفات</span>
                                </Button>
                            </div>
                        )}
                        <DataTable columns={columns} data={data?.data || []} />
                    </>
                )}
            </div>
        </>
    )
}

export default FilesPage