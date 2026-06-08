import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { Check, FilePlus, Loader2, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApproveRequest } from "../hooks/useApproveRequest";
import { useRejectRequest } from "../hooks/useRejectRequest";

interface RequestActionsProps {
  status: "Pending" | "Confirmed" | "Archived" | "Rejected";
  requestId: number;
  taxPayerId?: string | number | null;
}

const RequestActions = ({
  status,
  requestId,
  taxPayerId,
}: RequestActionsProps) => {
  const navigate = useNavigate();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");

  const { mutate: approveMutation, isPending: isApprovePending } =
    useApproveRequest();
  const { mutate: rejectMutation, isPending: isRejectPending } =
    useRejectRequest();

  const isMutating = isApprovePending || isRejectPending;

  const handleApprove = () => {
    approveMutation(requestId, {
      onSuccess: () => {
        navigate(`/dashboard/requests/confirmed/${requestId}`);
      },
    });
  };

  const handleReject = () => {
    rejectMutation(
      { requestId, note: rejectionNote },
      {
        onSuccess: () => {
          setIsRejectDialogOpen(false);
          setRejectionNote("");
          navigate(`/dashboard/requests/rejected/${requestId}`);
        },
      },
    );
  };

  const openRejectDialog = () => {
    setRejectionNote("");
    setIsRejectDialogOpen(true);
  };

  return (
    <>
      <Card className="rounded-3xl border border-dashed border-border/80 bg-muted/5 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-right space-y-1">
          <h4 className="font-black text-lg text-foreground">
            الإجراءات المتاحة لهذا الطلب
          </h4>
          <p className="text-sm text-muted-foreground font-bold">
            {status === "Pending" &&
              "يتطلب هذا الطلب مراجعة وقبول أو رفض من قبل المشرفين."}
            {status === "Confirmed" &&
              "تم تأكيد الطلب بنجاح. يمكنك الآن الانتقال لإنشاء ملف رسمي للمكلف."}
            {status === "Archived" &&
              "هذا الطلب مؤرشف ومحمي، لا يتطلب أي إجراءات إضافية."}
            {status === "Rejected" &&
              "هذا الطلب تم رفضه ومحفوظ للرجوع إليه، لا توجد إجراءات إضافية."}
          </p>
        </div>

        {/* Status-specific action triggers */}
        <div className="flex gap-3 w-full md:w-auto justify-center">
          {status === "Pending" && (
            <>
              <Button
                onClick={openRejectDialog}
                disabled={isMutating}
                variant="destructive"
                className="rounded-xl h-12 px-6 font-bold cursor-pointer hover:bg-destructive/95"
              >
                <X className="ml-2 size-4" />
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
            <NavLink
              to={ROUTES.DASHBOARD.FILES_CREATE + "?requestId=" + requestId + "&taxPayerId=" + taxPayerId}
              className="rounded-xl h-12 px-6 font-bold cursor-pointer hover:bg-primary-hover shadow-md shadow-primary/10"
            >
              <FilePlus className="ml-2 size-4" />
              إنشاء ملف لهذا الطلب
            </NavLink>
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

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent
          className="max-w-[calc(100vw-2rem)] sm:max-w-[450px] rounded-2xl !bg-white p-6"
          dir="rtl"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-right">
              رفض الطلب
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-right">
            <label className="text-sm font-medium text-muted-foreground">
              سبب الرفض *
            </label>
            <Input
              placeholder="أدخل سبب رفض الطلب..."
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
              className="h-12 rounded-xl bg-muted/30"
              dir="rtl"
            />
          </div>
          <DialogFooter className="flex-row-reverse justify-end gap-3 pt-4">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setIsRejectDialogOpen(false)}
              disabled={isRejectPending}
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              className="rounded-xl min-w-[120px]"
              onClick={handleReject}
              disabled={isRejectPending || !rejectionNote.trim()}
            >
              {isRejectPending ? (
                <Loader2 className="h-4 w-4 animate-spin ml-2" />
              ) : (
                <X className="h-4 w-4 ml-2" />
              )}
              تأكيد الرفض
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestActions;
