import { Loader2 } from "lucide-react";
import ErrorState from "@/app/pages/ErrorState";
import { useRegions } from "../hooks/regions/useRegions";
import { RegionsTable } from "../components/regions/RegionsTable";
import { CreateRegionDialog } from "../components/regions/CreateRegionDialog";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";

const RegionsPage = () => {
    const { data: regions, isLoading, isError } = useRegions();
    const canView = usePermission(ACTIONS.VIEW_BASIC_INFO);

    if (!canView) return <Unauthorized />;

    if (isError) {
        return <ErrorState />;
    }

    return (
        <div className="space-y-6 text-right animate-in fade-in duration-500">
            {/* Header Actions */}
            <div className="flex justify-end">
                <CreateRegionDialog />
            </div>

            {/* Content Table */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري جلب المناطق...</p>
                </div>
            ) : (
                <RegionsTable regions={regions?.data || []} />
            )}
        </div>
    );
};

export default RegionsPage;
