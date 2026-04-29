import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDepartments } from "../hooks/departments/useDepartments";
import { DepartmentsTable } from "../components/departments/DepartmentsTable";
import { CreateDepartmentDialog } from "../components/departments/CreateDepartmentDialog";

const DepartmentsPage = () => {
    const { data: departments, isLoading, isError } = useDepartments();

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
                <CreateDepartmentDialog />
            </div>

            {/* Content Table */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري تحميل البيانات...</p>
                </div>
            ) : (
                <DepartmentsTable departments={departments || []} />
            )}
        </div>
    );
};

export default DepartmentsPage;
