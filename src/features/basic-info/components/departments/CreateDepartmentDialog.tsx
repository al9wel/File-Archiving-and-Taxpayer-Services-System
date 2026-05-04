import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateDepartment } from "../../hooks/departments/useCreateDepartment";
import { DepartmentForm } from "./DepartmentForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";

export const CreateDepartmentDialog = () => {
    const [open, setOpen] = useState(false);
    const canCreate = usePermission(ACTIONS.CREATE_BASIC_INFO);
    const { mutate: createDept, isPending } = useCreateDepartment();

    const handleSubmit = (formData: FormData) => {
        createDept(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة القسم بنجاح");
                setOpen(false);
            },
            onError: (error) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة القسم");
            }
        });
    };

    if (!canCreate) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-[#911111] hover:bg-[#7a0e0e] text-white rounded-xl px-6 h-12 flex items-center gap-2 shadow-lg shadow-red-900/10 transition-all hover:scale-105 active:scale-95"
                >
                    <Plus className="size-5" />
                    <span>إضافة قسم جديد</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-2xl p-6" dir="rtl">
                <DialogHeader className="text-right">
                    <DialogTitle className="text-xl font-bold text-right">إضافة قسم جديد</DialogTitle>
                </DialogHeader>
                <DepartmentForm
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                    isLoading={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};
