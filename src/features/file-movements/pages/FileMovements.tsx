import DashboardHeader from "@/components/layout/DahsboardHeader"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { useFileMovements } from "../hooks/useFileMovements"
import { Loader2, FileText } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"
import { FileMovementStatisticsCards } from "../components/FileMovementStatisticsCards"
import { useSectionStatistics } from "@/hooks/useSectionStatistics"

import { useState } from "react"
import { generateFileMovementsReport } from "@/services/reports"

const FileMovements = () => {
    const { data, isPending, isError } = useFileMovements()
    const { data: statisticsData, isPending: statisticsIsPending } = useSectionStatistics()

    const [isGeneratingReport, setIsGeneratingReport] = useState(false)

    const canView = usePermission(ACTIONS.VIEW_FILE_MOVEMENT)

    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }

    const handleMovementsReport = async () => {
        try {
            setIsGeneratingReport(true)
            await generateFileMovementsReport(
                data?.data?.filesMovements || [],
                statisticsData?.data?.files_movements
            )
            toast.success("تم إنشاء تقرير حركات الملفات بنجاح")
        } catch (error: any) {
            toast.error(error.message || "حدث خطأ أثناء إنشاء التقرير")
        } finally {
            setIsGeneratingReport(false)
        }
    }

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" حركة الملفات "
                    desc="إدارة وتتبع حركات الملفات في النظام"
                />
            </div>

            <div className="mx-auto px-3 animate-in fade-in duration-500">
                {isPending ? (
                    <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                        <Loader2
                            className="animate-spin text-primary"
                            size={32}
                        />
                        <p className="text-muted-foreground animate-pulse">
                            جاري جلب حركات الملفات...
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="w-full">
                            <FileMovementStatisticsCards
                                statistics={statisticsData?.data?.files_movements}
                                isPending={statisticsIsPending}
                            />
                        </div>

                        {canView && (
                            <div className="flex justify-end mb-3">
                                <Button
                                    onClick={handleMovementsReport}
                                    disabled={isGeneratingReport}
                                    className="cursor-pointer p-4 hover:bg-primary-hover"
                                    size="lg"

                                >
                                    {isGeneratingReport ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <FileText className="h-4 w-4" />
                                    )}

                                    <span className="mr-2">
                                        تقرير الحركات
                                    </span>
                                </Button>
                            </div>
                        )}

                        <DataTable
                            columns={columns}
                            data={data?.data?.filesMovements || []}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default FileMovements
