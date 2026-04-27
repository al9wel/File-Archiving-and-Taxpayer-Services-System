import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActivityTypes } from "../../hooks/activity-types/useActivityTypes";
import { ActivityTypesTable } from "../../components/activity-types/ActivityTypesTable";
import { CreateActivityTypeDialog } from "../../components/activity-types/CreateActivityTypeDialog";

const ActivityTypesPage = () => {
    const { data: activityTypes, isLoading, isError } = useActivityTypes();

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <p className="text-red-600 font-bold">حدث خطأ أثناء تحميل البيانات</p>
                <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
            </div>
        );
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
                    <p className="text-muted-foreground animate-pulse">جاري تحميل البيانات...</p>
                </div>
            ) : (
                <ActivityTypesTable activityTypes={activityTypes || []} />
            )}
        </div>
    );
};

export default ActivityTypesPage;
