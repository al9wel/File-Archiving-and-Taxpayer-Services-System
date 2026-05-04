import { Loader2 } from "lucide-react";
import ErrorState from "@/app/pages/ErrorState";
import { usePaymentTypes } from "../hooks/payment-types/usePaymentTypes";
import { PaymentTypesTable } from "../components/payment-types/PaymentTypesTable";
import { CreatePaymentTypeDialog } from "../components/payment-types/CreatePaymentTypeDialog";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";

const PaymentTypesPage = () => {
    const { data: paymentTypes, isLoading, isError } = usePaymentTypes();
    const canView = usePermission(ACTIONS.VIEW_BASIC_INFO);

    if (!canView) return <Unauthorized />;

    if (isError) {
        return <ErrorState />;
    }

    return (
        <div className="space-y-6 text-right animate-in fade-in duration-500">
            {/* Header Actions */}
            <div className="flex justify-end">
                <CreatePaymentTypeDialog />
            </div>

            {/* Content Table */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">جاري جلب أنواع السداد...</p>
                </div>
            ) : (
                <PaymentTypesTable paymentTypes={paymentTypes?.data || []} />
            )}
        </div>
    );
};

export default PaymentTypesPage;
