import { Loader2 } from "lucide-react";
import ErrorState from "@/app/pages/ErrorState";
import { useEmploymentTypes } from "../hooks/employment-types/useEmploymentTypes";
import { EmploymentTypesTable } from "../components/employment-types/EmploymentTypesTable";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";

const EmploymentTypesPage = () => {
    const { data: employmentTypes, isLoading, isError } = useEmploymentTypes();
    const canView = usePermission(ACTIONS.VIEW_TAX_COLLECTOR);

    if (!canView) return <Unauthorized />;

    if (isError) {
        return <ErrorState />;
    }

    return (
        <div className="space-y-6 text-right animate-in fade-in duration-500">
            {/* Content Table */}

            {/* Content Table */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري جلب أنواع التوظيف...</p>
                </div>
            ) : (
                <EmploymentTypesTable employmentTypes={employmentTypes?.data || []} />
            )}
        </div>
    );
};

export default EmploymentTypesPage;
