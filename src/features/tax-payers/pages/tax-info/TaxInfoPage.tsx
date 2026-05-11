import { Loader2 } from "lucide-react";
import ErrorState from "@/app/pages/ErrorState";
import { useTaxInfos } from "../../hooks/tax-info/useTaxInfos";
import { TaxInfosTable } from "../../components/tax-info/TaxInfosTable";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";
import { columns } from "../../components/tax-info/columns";

const TaxInfoPage = () => {
    const { data: taxInfos, isLoading, isError } = useTaxInfos();
    const canView = usePermission(ACTIONS.VIEW_TAX_PAYER);

    if (!canView) return <Unauthorized />;

    if (isError) return <ErrorState />;

    return (
        <div className="space-y-6 text-right animate-in fade-in duration-500">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري جلب البيانات الضريبية...</p>
                </div>
            ) : (
                <TaxInfosTable columns={columns} data={taxInfos?.data || []} />
            )}
        </div>
    );
};

export default TaxInfoPage;
