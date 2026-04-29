import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import type { Region } from "@/types/Region";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import { toast } from "sonner";
import { useDeleteRegion } from "../../hooks/regions/useDeleteRegion";
import { useUpdateRegion } from "../../hooks/regions/useUpdateRegion";
import { RegionForm } from "./RegionForm";
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

interface RegionActionsProps {
    region: Region;
}

export const RegionActions = ({ region }: RegionActionsProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const canUpdate = usePermission(ACTIONS.UPDATE);
    const canDelete = usePermission(ACTIONS.DELETE);

    const { mutate: deleteMutation, isPending: isDeleting } = useDeleteRegion();
    const { mutate: updateMutation, isPending: isUpdating } = useUpdateRegion();

    const handleDelete = () => {
        deleteMutation(region.id, {
            onSuccess: () => {
                toast.success("تم حذف المنطقة بنجاح");
                setIsDeleteAlertOpen(false);
            },
            onError: (error) => {
                toast.error(error.message || "حدث خطأ أثناء حذف المنطقة");
            }
        });
    };

    const handleUpdate = (formData: FormData) => {
        updateMutation(
            { id: region.id, data: formData },
            {
                onSuccess: () => {
                    toast.success("تم تحديث بيانات المنطقة بنجاح");
                    setIsEditDialogOpen(false);
                },
                onError: (error) => {
                    toast.error(error.message || "حدث خطأ أثناء تحديث المنطقة");
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
                            <DialogTitle className="text-xl font-bold text-right">تعديل بيانات المنطقة</DialogTitle>
                        </DialogHeader>
                        <RegionForm
                            initialData={region}
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
                                <AlertDialogTitle className="text-right">حذف المنطقة</AlertDialogTitle>
                            </div>
                            <AlertDialogDescription className="text-right pt-2">
                                هل أنت متأكد من حذف المنطقة <span className="font-bold text-foreground">{region.name}</span>؟
                                <br />
                                . سيتم حذف جميع البيانات الخاصه بهذه المنطقة بما في ذلك الاحياء المرتبطه بها ولن تتمكن من استعادتها مرة أخرى.
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
