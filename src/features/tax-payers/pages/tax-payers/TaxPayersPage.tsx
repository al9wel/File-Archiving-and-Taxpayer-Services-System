import { TaxPayersTable } from "../../components/tax-payers/AllTaxPayersTable"
import { columns } from "../../components/tax-payers/columns"
import { useTaxPayers } from "../../hooks/tax-payers/useTaxPayers"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"
import { useMemo, useState } from "react"

const TaxPayersPage = () => {
    const { data, isLoading, isError } = useTaxPayers()
    const canView = usePermission(ACTIONS.VIEW_TAX_PAYER)
    const [fileTypeFilter, setFileTypeFilter] = useState("")
    const filteredTaxPayers = useMemo(
        () => data?.data.filter((p) => !fileTypeFilter || p.taxPayerFileType === fileTypeFilter) || [],
        [data?.data, fileTypeFilter]
    )

    if (!canView) return <Unauthorized />

    if (isError) {
        return <ErrorState />
    }
    return (
        <div className="container mx-auto animate-in fade-in duration-500">
            {isLoading ? (
                <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <p className="text-muted-foreground animate-pulse">جاري جلب المكلفين...</p>
                </div>
            ) : (
                <TaxPayersTable
                    columns={columns}
                    data={filteredTaxPayers}
                    fileTypeFilter={fileTypeFilter}
                    onFileTypeFilterChange={setFileTypeFilter}
                />
            )}
        </div>
    )
}

export default TaxPayersPage
