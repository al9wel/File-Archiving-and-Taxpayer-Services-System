import { Loader2 } from "lucide-react";
import ErrorState from "@/app/pages/ErrorState";
import { useFileStatuses } from "../hooks/file-status/useFileStatuses";
import { FileStatusTable } from "../components/file-status/FileStatusTable";
import { CreateFileStatusDialog } from "../components/file-status/CreateFileStatusDialog";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";

const FileStatusPage = () => {
    const { data: fileStatuses, isPending, isError } = useFileStatuses();
    const canView = usePermission(ACTIONS.VIEW_BASIC_INFO);

    if (!canView) return <Unauthorized />;

    if (isError) {
        return <ErrorState />;
    }

    return (
        <div className="space-y-6 text-right animate-in fade-in duration-500">
            {/* Header Actions */}
            <div className="flex justify-end">
                <CreateFileStatusDialog />
            </div>

            {/* Content Table */}
            {isPending ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري جلب حالات الملفات...</p>
                </div>
            ) : (
                <FileStatusTable fileStatuses={fileStatuses?.data || []} />
            )}
        </div>
    );
};

export default FileStatusPage;
