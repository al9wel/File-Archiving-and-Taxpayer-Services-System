import { TaxPayersTable } from "../../components/tax-payers/AllTaxPayersTable"
import { columns } from "../../components/tax-payers/columns"
import { useTaxPayers } from "../../hooks/tax-payers/useTaxPayers"
import { Loader2, FileText } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"
import { useMemo, useState } from "react"
import { generateAllTaxPayersReport } from "@/services/reports"

const TaxPayersPage = () => {
    const { data, isLoading, isError } = useTaxPayers()
    const canView = usePermission(ACTIONS.VIEW_TAX_PAYER)
    const [fileTypeFilter, setFileTypeFilter] = useState("")
    const [isGeneratingReport, setIsGeneratingReport] = useState(false)
    const filteredTaxPayers = useMemo(
        () => data?.data.filter((p) => !fileTypeFilter || p.taxPayerFileType === fileTypeFilter) || [],
        [data?.data, fileTypeFilter]
    )

    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }

    const handleTaxPayersReport = async () => {
        try {
            setIsGeneratingReport(true)
            await generateAllTaxPayersReport(data?.data || [])
            toast.success("تم إنشاء تقرير جميع المكلفين بنجاح")
        } catch (error: any) {
            toast.error(error.message || "حدث خطأ أثناء إنشاء التقرير")
        } finally {
            setIsGeneratingReport(false)
        }
    }

    return (
        <div className="container mx-auto animate-in fade-in duration-500">
            {isLoading ? (
                <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <p className="text-muted-foreground animate-pulse">جاري جلب المكلفين...</p>
                </div>
            ) : (
                <>
                    {canView && (
                        <div className="flex justify-end mb-3">
                            <Button
                                onClick={handleTaxPayersReport}
                                disabled={isGeneratingReport}
                                className="cursor-pointer p-4 hover:bg-primary-hover"
                                size="lg"
                            >
                                {isGeneratingReport ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <FileText className="h-4 w-4" />
                                )}
                                <span className="mr-2">تقرير جميع المكلفين</span>
                            </Button>
                        </div>
                    )}
                    <TaxPayersTable
                        columns={columns}
                        data={filteredTaxPayers}
                        fileTypeFilter={fileTypeFilter}
                        onFileTypeFilterChange={setFileTypeFilter}
                    />
                </>
            )}
        </div>
    )
}

export default TaxPayersPage

