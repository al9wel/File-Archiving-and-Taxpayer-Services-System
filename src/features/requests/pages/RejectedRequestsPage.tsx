import { useRejectedRequests } from "../hooks/useRejectedRequests";
import CardList from "../components/CardList";
import { Loader2 } from "lucide-react";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";
import ErrorState from "@/app/pages/ErrorState";

const RejectedRequestsPage = () => {
    const { data, isPending, isError } = useRejectedRequests();
    const canView = usePermission(ACTIONS.VIEW_REQUEST);

    if (!canView) return <Unauthorized />;

    if (isError) {
        return <ErrorState />;
    }

    const requestsList = data?.data || [];

    return (
        <div className="container mx-auto animate-in fade-in duration-500">
            {isPending ? (
                <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <p className="text-muted-foreground animate-pulse font-bold">جاري جلب الطلبات المرفوضة...</p>
                </div>
            ) : (
                <CardList
                    title="الطلبات المرفوضة"
                    requests={requestsList}
                />
            )}
        </div>
    );
};

export default RejectedRequestsPage;
