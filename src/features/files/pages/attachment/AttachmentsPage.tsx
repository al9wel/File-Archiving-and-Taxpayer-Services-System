import { Loader2 } from "lucide-react";
import ErrorState from "@/app/pages/ErrorState";
import { useAttachments } from "../../hooks/attachment/useAttachments";
import { AttachmentTable } from "../../components/attachment/AttachmentTable";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";
import { columns } from "../../components/attachment/columns";

const AttachmentsPage = () => {
    const { data: attachments, isLoading, isError } = useAttachments();
    const canView = usePermission(ACTIONS.VIEW_FILE);

    if (!canView) return <Unauthorized />;

    if (isError) return <ErrorState />;

    return (
        <div className="space-y-6 text-right animate-in fade-in duration-500">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري جلب المرفقات...</p>
                </div>
            ) : (
                <AttachmentTable columns={columns} data={attachments?.data || []} />
            )}
        </div>
    );
};

export default AttachmentsPage;