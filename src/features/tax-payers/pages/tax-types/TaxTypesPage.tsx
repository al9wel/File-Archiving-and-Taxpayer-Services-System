import { Loader2 } from "lucide-react";
import ErrorState from "@/app/pages/ErrorState";
import { useTaxTypes } from "../../hooks/tax-type/useTaxTypes";
import { TaxTypesTable } from "../../components/tax-types/TaxTypesTable";
import { CreateTaxTypeDialog } from "../../components/tax-types/CreateTaxTypeDialog";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";

const TaxTypesPage = () => {
    const { data: taxTypes, isLoading, isError } = useTaxTypes();
    const canView = usePermission(ACTIONS.VIEW_TAX_PAYER);

    if (!canView) return <Unauthorized />;

    if (isError) return <ErrorState />;

    return (
        <div className="space-y-6 text-right animate-in fade-in duration-500">
            <div className="flex justify-end">
                <CreateTaxTypeDialog />
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري جلب الأنواع...</p>
                </div>
            ) : (
                <TaxTypesTable taxTypes={taxTypes?.data || []} />
            )}
        </div>
    );
};

export default TaxTypesPage;
