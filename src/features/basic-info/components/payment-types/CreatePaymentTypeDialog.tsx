import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreatePaymentType } from "../../hooks/payment-types/useCreatePaymentType";
import { PaymentTypeForm } from "./PaymentTypeForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";

export const CreatePaymentTypeDialog = () => {
    const [open, setOpen] = useState(false);
    const canCreate = usePermission(ACTIONS.CREATE);
    const { mutate: createMutation, isPending } = useCreatePaymentType();

    const handleSubmit = (formData: FormData) => {
        createMutation(formData, {
            onSuccess: () => {
                toast.success("تم إضافة نوع السداد بنجاح");
                setOpen(false);
            },
            onError: (error) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة نوع السداد");
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
                    <span>إضافة نوع سداد جديد</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-2xl p-6" dir="rtl">
                <DialogHeader className="text-right">
                    <DialogTitle className="text-xl font-bold text-right">إضافة نوع سداد جديد</DialogTitle>
                </DialogHeader>
                <PaymentTypeForm
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                    isLoading={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};
