import { TaxPayersTable } from "../../../components/tax-payers/individual/IndividualTaxPayersTable"
import { columns } from "../../../components/tax-payers/individual/columns"
import { useIndividualTaxPayers } from "../../../hooks/tax-payers/individual/useIndividualTaxPayers"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

const TaxPayersPage = () => {
    const { data, isLoading, isError } = useIndividualTaxPayers()
    const canView = usePermission(ACTIONS.VIEW_TAX_PAYER)

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
                <TaxPayersTable columns={columns} data={data?.data || []} />
            )}
        </div>
    )
}

export default TaxPayersPage
