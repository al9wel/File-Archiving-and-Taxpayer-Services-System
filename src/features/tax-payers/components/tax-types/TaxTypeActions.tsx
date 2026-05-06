import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import type { TaxType } from "@/types/TaxType";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import { toast } from "sonner";
import { useDeleteTaxType } from "../../hooks/tax-type/useDeleteTaxType";
import { useUpdateTaxType } from "../../hooks/tax-type/useUpdateTaxType";
import { TaxTypeForm } from "./TaxTypeForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface TaxTypeActionsProps {
    taxType: TaxType;
}

export const TaxTypeActions = ({ taxType }: TaxTypeActionsProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const canUpdate = usePermission(ACTIONS.UPDATE_TAX_PAYER);
    const canDelete = usePermission(ACTIONS.DELETE_TAX_PAYER);

    const { mutate: deleteType, isPending: isDeleting } = useDeleteTaxType();
    const { mutate: updateType, isPending: isUpdating } = useUpdateTaxType();

    const handleDelete = () => {
        deleteType(taxType.id, {
            onSuccess: () => {
                toast.success("تم حذف نوع الضريبة بنجاح");
                setIsDeleteAlertOpen(false);
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء حذف النوع");
            }
        });
    };

    const handleUpdate = (formData: FormData) => {
        updateType(
            { id: taxType.id, data: formData },
            {
                onSuccess: (res) => {
                    toast.success(res.message || "تم تحديث نوع الضريبة بنجاح");
                    setIsEditDialogOpen(false);
                },
                onError: (error: any) => {
                    toast.error(error.message || "حدث خطأ أثناء تحديث النوع");
                }
            }
        );
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {canUpdate && (
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="size-9 rounded-xl hover:bg-primary/5 hover:text-primary border-none shadow-sm">
                            <Pencil className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-2xl p-6" dir="rtl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-right">تعديل نوع الضريبة</DialogTitle>
                        </DialogHeader>
                        <TaxTypeForm
                            initialData={taxType}
                            onSubmit={handleUpdate}
                            onCancel={() => setIsEditDialogOpen(false)}
                            isLoading={isUpdating}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {canDelete && (
                <Dialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="size-9 rounded-xl border-none shadow-sm bg-red-50 hover:bg-red-100 text-red-600">
                            <Trash2 className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg" dir="rtl">
                        <DialogHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <DialogTitle className="text-right">حذف نوع الضريبة</DialogTitle>
                            </div>
                        </DialogHeader>
                        <div className="space-y-4 text-right pt-4">
                            <p className="text-sm text-muted-foreground">
                                هل أنت متأكد من حذف نوع الضريبة <span className="font-bold text-foreground">{taxType.name}</span>؟
                                <br />لا يمكن التراجع عن هذا الإجراء.
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-3 mt-6">
                            <Button variant="secondary" className="rounded-lg" onClick={() => setIsDeleteAlertOpen(false)} disabled={isDeleting}>إلغاء</Button>
                            <Button variant="destructive" className="rounded-lg min-w-[120px]" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : "تأكيد الحذف"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
