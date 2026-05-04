import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateEmploymentType } from "../../hooks/employment-types/useCreateEmploymentType";
import { EmploymentTypeForm } from "./EmploymentTypeForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";

export const CreateEmploymentTypeDialog = () => {
    const [open, setOpen] = useState(false);
    const canCreate = usePermission(ACTIONS.CREATE_TAX_COLLECTOR);
    const { mutate: createType, isPending } = useCreateEmploymentType();

    const handleSubmit = (formData: FormData) => {
        createType(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة نوع التوظيف بنجاح");
                setOpen(false);
            },
            onError: (error) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة نوع التوظيف");
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
                    <span>إضافة نوع جديد</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[500px] rounded-2xl p-6" dir="rtl">
                <DialogHeader className="text-right">
                    <DialogTitle className="text-xl font-bold text-right">إضافة نوع وظيفة جديد</DialogTitle>
                </DialogHeader>
                <EmploymentTypeForm
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                    isLoading={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};
