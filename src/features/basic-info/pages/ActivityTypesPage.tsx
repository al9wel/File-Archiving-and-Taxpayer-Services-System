import { Loader2 } from "lucide-react";
import ErrorState from "@/app/pages/ErrorState";
import { useActivityTypes } from "../hooks/activity-types/useActivityTypes";
import { ActivityTypesTable } from "../components/activity-types/ActivityTypesTable";
import { CreateActivityTypeDialog } from "../components/activity-types/CreateActivityTypeDialog";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";

const ActivityTypesPage = () => {
    const { data: activityTypes, isLoading, isError } = useActivityTypes();
    const canView = usePermission(ACTIONS.VIEW_BASIC_INFO);

    if (!canView) return <Unauthorized />;

    if (isError) {
        return <ErrorState />;
    }

    return (
        <div className="space-y-6 text-right animate-in fade-in duration-500">
            {/* Header Actions */}
            <div className="flex justify-end">
                <CreateActivityTypeDialog />
            </div>

            {/* Content Table */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري جلب أنواع الأنشطة...</p>
                </div>
            ) : (
                <ActivityTypesTable activityTypes={activityTypes?.data || []} />
            )}
        </div>
    );
};

export default ActivityTypesPage;
