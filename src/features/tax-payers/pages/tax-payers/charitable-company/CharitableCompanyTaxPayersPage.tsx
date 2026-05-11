import { TaxPayersTable } from "../../../components/tax-payers/charitable-company/CharitableCompanyTaxPayersTable"
import { columns } from "../../../components/tax-payers/charitable-company/columns"
import { useCharitableCompanyTaxPayers } from "../../../hooks/tax-payers/charitable-company/useCharitableCompanyTaxPayers"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

const CharitableCompanyTaxPayersPage = () => {
    const { data, isLoading, isError } = useCharitableCompanyTaxPayers()
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

export default CharitableCompanyTaxPayersPage
