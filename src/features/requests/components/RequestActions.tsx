import { useNavigate } from "react-router-dom";
import { useApproveRequest } from "../hooks/useApproveRequest";
import { useRejectRequest } from "../hooks/useRejectRequest";
import { Loader2, Check, X, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

interface RequestActionsProps {
    status: "Pending" | "Confirmed" | "Archived" | "Rejected";
    requestId: number;
}

const RequestActions = ({ status, requestId }: RequestActionsProps) => {
    const navigate = useNavigate();
    const { mutate: approveMutation, isPending: isApprovePending } = useApproveRequest();
    const { mutate: rejectMutation, isPending: isRejectPending } = useRejectRequest();

    const isMutating = isApprovePending || isRejectPending;

    const handleApprove = () => {
        approveMutation(requestId);
    };

    const handleReject = () => {
        rejectMutation(requestId);
    };

    return (
        <Card className="rounded-3xl border border-dashed border-border/80 bg-muted/5 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right space-y-1">
                <h4 className="font-black text-lg text-foreground">الإجراءات المتاحة لهذا الطلب</h4>
                <p className="text-sm text-muted-foreground font-bold">
                    {status === "Pending" && "يتطلب هذا الطلب مراجعة وقبول أو رفض من قبل المشرفين."}
                    {status === "Confirmed" && "تم تأكيد الطلب بنجاح. يمكنك الآن الانتقال لإنشاء ملف رسمي للمكلف."}
                    {status === "Archived" && "هذا الطلب مؤرشف ومحمي، لا يتطلب أي إجراءات إضافية."}
                    {status === "Rejected" && "هذا الطلب تم رفضه ومحفوظ للرجوع إليه، لا توجد إجراءات إضافية."}
                </p>
            </div>

            {/* Status-specific action triggers */}
            <div className="flex gap-3 w-full md:w-auto justify-center">
                {status === "Pending" && (
                    <>
                        <Button
                            onClick={handleReject}
                            disabled={isMutating}
                            variant="destructive"
                            className="rounded-xl h-12 px-6 font-bold cursor-pointer hover:bg-destructive/95"
                        >
                            {isRejectPending ? (
                                <Loader2 className="ml-2 size-4 animate-spin" />
                            ) : (
                                <X className="ml-2 size-4" />
                            )}
                            رفض الطلب
                        </Button>
                        <Button
                            onClick={handleApprove}
                            disabled={isMutating}
                            className="rounded-xl h-12 px-6 font-bold cursor-pointer hover:bg-primary-hover shadow-md shadow-primary/10"
                        >
                            {isApprovePending ? (
                                <Loader2 className="ml-2 size-4 animate-spin" />
                            ) : (
                                <Check className="ml-2 size-4" />
                            )}
                            موافقة على الطلب
                        </Button>
                    </>
                )}

                {status === "Confirmed" && (
                    <Button
                        onClick={() => navigate(ROUTES.DASHBOARD.FILES_CREATE)}
                        className="rounded-xl h-12 px-6 font-bold cursor-pointer hover:bg-primary-hover shadow-md shadow-primary/10"
                    >
                        <FilePlus className="ml-2 size-4" />
                        إنشاء ملف لهذا الطلب
                    </Button>
                )}

                {(status === "Archived" || status === "Rejected") && (
                    <Button
                        disabled
                        variant="outline"
                        className="rounded-xl h-12 px-6 font-bold"
                    >
                        لا توجد إجراءات متاحة
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default RequestActions;
