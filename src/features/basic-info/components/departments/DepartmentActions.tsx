import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import type { Department } from "@/types/Department";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import { toast } from "sonner";
import { useDeleteDepartment } from "../../hooks/departments/useDeleteDepartment";
import { useUpdateDepartment } from "../../hooks/departments/useUpdateDepartment";
import { useMoveDepartmentUsers } from "../../hooks/departments/useMoveDepartmentUsers";
import { useDepartments } from "../../hooks/departments/useDepartments";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { DepartmentForm } from "./DepartmentForm";
// alert-dialog removed: replaced by Dialog-based delete flow
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface DepartmentActionsProps {
    department: Department;
}

export const DepartmentActions = ({ department }: DepartmentActionsProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const canUpdate = usePermission(ACTIONS.UPDATE_BASIC_INFO);
    const canDelete = usePermission(ACTIONS.DELETE_BASIC_INFO);

    const { mutate: deleteDept, isPending: isDeleting } = useDeleteDepartment();
    const { mutate: updateDept, isPending: isUpdating } = useUpdateDepartment();
    const { mutate: moveUsers, isPending: isMoving } = useMoveDepartmentUsers();
    const { data: departments } = useDepartments();

    const [deleteOption, setDeleteOption] = useState<"delete" | "move">("delete");
    const [targetDeptId, setTargetDeptId] = useState<string | null>(null);

    const handleDelete = () => {
        if (deleteOption === "delete") {
            deleteDept(department.id, {
                onSuccess: (res) => {
                    toast.success(res.message || "تم حذف القسم بنجاح");
                    setIsDeleteAlertOpen(false);
                },
                onError: (error) => {
                    toast.error(error.message || "حدث خطأ أثناء حذف القسم");
                }
            });
            return;
        }
        // move then delete
        if (!targetDeptId) {
            toast.error("الرجاء اختيار قسم مستهدف لنقل المستخدمين إليه");
            return;
        }
        const targetDept = departments?.data?.find(d => d.id.toString() === targetDeptId);
        if (!targetDept) {
            toast.error("القسم المستهدف غير صالح");
            return;
        }
        moveUsers({ oldId: department.id, newId: targetDept.id }, {
            onSuccess: () => {
                // after moving users, delete the department
                deleteDept(department.id, {
                    onSuccess: () => {
                        toast.success("تم نقل المستخدمين وحذف القسم بنجاح");
                        setIsDeleteAlertOpen(false);
                    },
                    onError: () => {
                        toast.error("حدث خطأ أثناء حذف القسم بعد النقل");
                    }
                });
            },
            onError: (error) => {
                toast.error(error.message || "حدث خطأ أثناء نقل المستخدمين");
            }
        });
    };

    const handleUpdate = (formData: FormData) => {
        updateDept(
            { id: department.id, data: formData },
            {
                onSuccess: (res) => {
                    toast.success(res.message || "تم تحديث بيانات القسم بنجاح");
                    setIsEditDialogOpen(false);
                },
                onError: (error) => {
                    toast.error(error.message || "حدث خطأ أثناء تحديث القسم");
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
                    <DialogContent className="sm:max-w-[500px] rounded-2xl p-6" dir="rtl">
                        <DialogHeader className="text-right">
                            <DialogTitle className="text-xl font-bold text-right">تعديل بيانات القسم</DialogTitle>
                        </DialogHeader>
                        <DepartmentForm
                            initialData={department}
                            onSubmit={handleUpdate}
                            onCancel={() => setIsEditDialogOpen(false)}
                            isLoading={isUpdating}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {/* Delete Dialog with two options: delete with users OR move users then delete */}
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
                                <DialogTitle className="text-right">حذف القسم</DialogTitle>
                            </div>
                        </DialogHeader>
                        <div className="space-y-4 text-right">
                            <p className="text-sm text-muted-foreground">
                                حذف القسم سيؤثر على المستخدمين المرتبطين به. اختر أحد الخيارات أدناه.
                            </p>
                            <div
                                className={`p-3 rounded-lg border ${deleteOption === "delete" ? "border-primary bg-primary/5" : "border-muted bg-background"} cursor-pointer`}
                                onClick={() => setDeleteOption("delete")}>
                                <h3 className="font-semibold">حذف القسم مع جميع المستخدمين المرتبطين</h3>
                                <p className="text-sm text-muted-foreground">سيتم حذف القسم وجميع المستخدمين المرتبطين به نهائياً.</p>
                            </div>
                            <div
                                className={`p-3 rounded-lg border ${deleteOption === "move" ? "border-primary bg-primary/5" : "border-muted bg-background"} cursor-pointer`}
                                onClick={() => setDeleteOption("move")}>
                                <h3 className="font-semibold">نقل المستخدمين لقسم آخر ثم الحذف</h3>
                                <p className="text-sm text-muted-foreground">اختر قسماً لاستقبال المستخدمين ثم سيتم حذف القسم الحالي.</p>
                                {deleteOption === "move" && (
                                    <div className="mt-3">
                                        <div className="h-12 w-full">
                                            <Select
                                                onValueChange={(val) => setTargetDeptId(val)}
                                                value={targetDeptId || undefined}
                                                defaultValue={undefined}
                                            >
                                                <SelectTrigger style={{ height: "100%" }} className="w-full h-full bg-muted/30">
                                                    <SelectValue placeholder="إختر القسم المستهدف" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departments?.data?.filter(d => d.id !== department.id).map((dept) => (
                                                        <SelectItem key={dept.id} value={dept.id.toString()}>
                                                            {dept.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 mt-6">
                            <Button variant="secondary" className="rounded-lg" onClick={() => setIsDeleteAlertOpen(false)} disabled={isDeleting || isMoving}>
                                إلغاء
                            </Button>
                            <Button
                                variant="destructive"
                                className="rounded-lg min-w-[120px]"
                                onClick={handleDelete}
                                disabled={isDeleting || isMoving}
                            >
                                {(isDeleting || isMoving) ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>جاري المعالجة...</span>
                                    </div>
                                ) : (
                                    deleteOption === "delete" ? "تأكيد الحذف" : "نقل المستخدمين ثم الحذف"
                                )}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
