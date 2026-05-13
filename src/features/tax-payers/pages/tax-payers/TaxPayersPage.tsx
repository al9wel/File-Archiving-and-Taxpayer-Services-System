import { TaxPayersTable } from "../../components/tax-payers/AllTaxPayersTable"
import { columns } from "../../components/tax-payers/columns"
import { useTaxPayers } from "../../hooks/tax-payers/useTaxPayers"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TaxPayersPage = () => {
    const { data, isLoading, isError } = useTaxPayers()
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
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mx-auto mb-8">
                        <TabsTrigger value="all">الكل</TabsTrigger>
                        <TabsTrigger value="individual">فرد</TabsTrigger>
                        <TabsTrigger value="company">شركه</TabsTrigger>
                        <TabsTrigger value="charitable-company">شركة خيريه</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="animate-in slide-in-from-right-5 duration-300">
                        <TaxPayersTable columns={columns} data={data?.data || []} />
                    </TabsContent>
                    <TabsContent value="individual" className="animate-in slide-in-from-right-5 duration-300">
                        <TaxPayersTable columns={columns} data={data?.data.filter((p) => p.taxPayerFileType === "Individual") || []} />
                    </TabsContent>
                    <TabsContent value="company" className="animate-in slide-in-from-right-5 duration-300">
                        <TaxPayersTable columns={columns} data={data?.data.filter((p) => p.taxPayerFileType === "Company") || []} />
                    </TabsContent>
                    <TabsContent value="charitable-company" className="animate-in slide-in-from-right-5 duration-300">
                        <TaxPayersTable columns={columns} data={data?.data.filter((p) => p.taxPayerFileType === "CharitableCompany") || []} />
                    </TabsContent>
                </Tabs>
            )}
        </div>
    )
}

export default TaxPayersPage
