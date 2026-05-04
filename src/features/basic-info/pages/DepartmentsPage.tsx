import { Loader2 } from "lucide-react";
import ErrorState from "@/app/pages/ErrorState";
import { useDepartments } from "../hooks/departments/useDepartments";
import { DepartmentsTable } from "../components/departments/DepartmentsTable";
import { CreateDepartmentDialog } from "../components/departments/CreateDepartmentDialog";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";

const DepartmentsPage = () => {
    const { data: departments, isLoading, isError } = useDepartments();
    const canView = usePermission(ACTIONS.VIEW_BASIC_INFO);

    if (!canView) return <Unauthorized />;

    if (isError) {
        return <ErrorState />;
    }

    return (
        <div className="space-y-6 text-right animate-in fade-in duration-500">
            {/* Header Actions */}
            <div className="flex justify-end">
                <CreateDepartmentDialog />
            </div>

            {/* Content Table */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري جلب الأقسام...</p>
                </div>
            ) : (
                <DepartmentsTable departments={departments?.data || []} />
            )}
        </div>
    );
};

export default DepartmentsPage;
