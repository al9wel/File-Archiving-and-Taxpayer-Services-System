import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TaxTypeForm } from "./TaxTypeForm";
import { useCreateTaxType } from "../../hooks/tax-type/useCreateTaxType";
import { toast } from "sonner";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";

export const CreateTaxTypeDialog = () => {
    const [open, setOpen] = useState(false);
    const { mutate: createType, isPending } = useCreateTaxType();
    const canCreate = usePermission(ACTIONS.CREATE_TAX_PAYER);

    if (!canCreate) return null;

    const handleSubmit = (formData: FormData) => {
        createType(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة نوع الضريبة بنجاح");
                setOpen(false);
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة النوع");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white shadow-lg flex items-center gap-2 transition-all active:scale-95">
                    <Plus className="h-5 w-5" />
                    <span className="font-bold">إضافة نوع جديد</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-2xl p-6" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-right">إضافة نوع ضريبة جديد</DialogTitle>
                </DialogHeader>
                <TaxTypeForm
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                    isLoading={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};
