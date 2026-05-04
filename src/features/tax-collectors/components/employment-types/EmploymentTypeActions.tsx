import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import type { EmploymentType } from "@/types";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import { toast } from "sonner";
import { useDeleteEmploymentType } from "../../hooks/employment-types/useDeleteEmploymentType";
import { useUpdateEmploymentType } from "../../hooks/employment-types/useUpdateEmploymentType";
import { EmploymentTypeForm } from "./EmploymentTypeForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface EmploymentTypeActionsProps {
    employmentType: EmploymentType;
}

export const EmploymentTypeActions = ({ employmentType }: EmploymentTypeActionsProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const canUpdate = usePermission(ACTIONS.UPDATE_TAX_COLLECTOR);
    const canDelete = usePermission(ACTIONS.DELETE_TAX_COLLECTOR);

    const { mutate: deleteType, isPending: isDeleting } = useDeleteEmploymentType();
    const { mutate: updateType, isPending: isUpdating } = useUpdateEmploymentType();

    const handleDelete = () => {
        deleteType(employmentType.id, {
            onSuccess: (res) => {
                toast.success(res.message || "تم حذف نوع التوظيف بنجاح");
                setIsDeleteAlertOpen(false);
            },
            onError: (error) => {
                toast.error(error.message || "حدث خطأ أثناء حذف نوع التوظيف");
            }
        });
    };

    const handleUpdate = (formData: FormData) => {
        updateType(
            { id: employmentType.id, data: formData },
            {
                onSuccess: (res) => {
                    toast.success(res.message || "تم تحديث بيانات نوع التوظيف بنجاح");
                    setIsEditDialogOpen(false);
                },
                onError: (error) => {
                    toast.error(error.message || "حدث خطأ أثناء تحديث نوع التوظيف");
                }
            }
        );
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {/* Edit Dialog */}
            {canUpdate && (
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-9 rounded-xl hover:bg-primary/5 hover:text-primary border-none shadow-sm"
                        >
                            <Pencil className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[500px] rounded-2xl p-6" dir="rtl">
                        <DialogHeader className="text-right">
                            <DialogTitle className="text-xl font-bold text-right">تعديل بيانات النوع</DialogTitle>
                        </DialogHeader>
                        <EmploymentTypeForm
                            initialData={employmentType}
                            onSubmit={handleUpdate}
                            onCancel={() => setIsEditDialogOpen(false)}
                            isLoading={isUpdating}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {/* Delete Dialog */}
            {canDelete && (
                <Dialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-9 rounded-xl border-none shadow-sm bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400"
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg" dir="rtl">
                        <DialogHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <DialogTitle className="text-right">حذف نوع التوظيف</DialogTitle>
                            </div>
                        </DialogHeader>
                        <div className="space-y-4 text-right">
                            <p className="text-sm text-muted-foreground">
                                هل أنت متأكد من رغبتك في حذف هذا النوع؟ لا يمكن التراجع عن هذا الإجراء.
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-3 mt-6">
                            <Button variant="secondary" className="rounded-lg" onClick={() => setIsDeleteAlertOpen(false)} disabled={isDeleting}>
                                إلغاء
                            </Button>
                            <Button
                                variant="destructive"
                                className="rounded-lg min-w-[120px]"
                                onClick={handleDelete}
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
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
