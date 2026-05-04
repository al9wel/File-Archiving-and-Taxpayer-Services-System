import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import type { PaymentType } from "@/types/PaymentType";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import { toast } from "sonner";
import { useDeletePaymentType } from "../../hooks/payment-types/useDeletePaymentType";
import { useUpdatePaymentType } from "../../hooks/payment-types/useUpdatePaymentType";
import { PaymentTypeForm } from "./PaymentTypeForm";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface PaymentTypeActionsProps {
    paymentType: PaymentType;
}

export const PaymentTypeActions = ({ paymentType }: PaymentTypeActionsProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const canUpdate = usePermission(ACTIONS.UPDATE_BASIC_INFO);
    const canDelete = usePermission(ACTIONS.DELETE_BASIC_INFO);

    const { mutate: deleteMutation, isPending: isDeleting } = useDeletePaymentType();
    const { mutate: updateMutation, isPending: isUpdating } = useUpdatePaymentType();

    const handleDelete = () => {
        deleteMutation(paymentType.id, {
            onSuccess: (res) => {
                toast.success(res.message || "تم حذف نوع السداد بنجاح");
                setIsDeleteAlertOpen(false);
            },
            onError: (error) => {
                toast.error(error.message || "حدث خطأ أثناء حذف نوع السداد");
            }
        });
    };

    const handleUpdate = (formData: FormData) => {
        updateMutation(
            { id: paymentType.id, data: formData },
            {
                onSuccess: (res) => {
                    toast.success(res.message || "تم تحديث بيانات نوع السداد بنجاح");
                    setIsEditDialogOpen(false);
                },
                onError: (error) => {
                    toast.error(error.message || "حدث خطأ أثناء تحديث نوع السداد");
                }
            }
        );
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {/* Edit Dialog */}
            {canUpdate && (
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-9 rounded-xl hover:bg-primary/5 hover:text-primary border-none shadow-sm"
                        onClick={() => setIsEditDialogOpen(true)}
                    >
                        <Pencil className="size-4" />
                    </Button>
                    <DialogContent className="sm:max-w-[500px] rounded-2xl p-6" dir="rtl">
                        <DialogHeader className="text-right">
                            <DialogTitle className="text-xl font-bold text-right">تعديل بيانات نوع السداد</DialogTitle>
                        </DialogHeader>
                        <PaymentTypeForm
                            initialData={paymentType}
                            onSubmit={handleUpdate}
                            onCancel={() => setIsEditDialogOpen(false)}
                            isLoading={isUpdating}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {/* Delete Alert */}
            {canDelete && (
                <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-9 rounded-xl border-none shadow-sm bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400"
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm" dir="rtl">
                        <AlertDialogHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <AlertDialogTitle className="text-right">حذف نوع السداد</AlertDialogTitle>
                            </div>
                            <AlertDialogDescription className="text-right pt-2">
                                هل أنت متأكد من حذف نوع السداد <span className="font-bold text-foreground">{paymentType.name}</span>؟
                                <br />
                                لا يمكن التراجع عن هذا الإجراء وسيتم إزالته نهائياً من النظام.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-row-reverse gap-3">
                            <AlertDialogAction
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete();
                                }}
                                variant="destructive"
                                className="rounded-lg min-w-[100px]"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>جاري الحذف...</span>
                                    </div>
                                ) : (
                                    "تأكيد الحذف"
                                )}
                            </AlertDialogAction>
                            <AlertDialogCancel
                                className="rounded-lg"
                                disabled={isDeleting}
                            >
                                إلغاء
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
};
