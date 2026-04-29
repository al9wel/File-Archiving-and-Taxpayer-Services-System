import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDistricts } from "../hooks/districts/useDistricts";
import { DistrictsTable } from "../components/districts/DistrictsTable";
import { CreateDistrictDialog } from "../components/districts/CreateDistrictDialog";

const DistrictsPage = () => {
    const { data: districts, isLoading, isError } = useDistricts();

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
                <CreateDistrictDialog />
            </div>

            {/* Content Table */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري تحميل البيانات...</p>
                </div>
            ) : (
                <DistrictsTable districts={districts || []} />
            )}
        </div>
    );
};

export default DistrictsPage;
