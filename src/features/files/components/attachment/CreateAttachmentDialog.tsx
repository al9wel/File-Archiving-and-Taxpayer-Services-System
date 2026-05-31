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
import { AttachmentForm } from "./AttachmentForm";
import { useCreateAttachment } from "../../hooks/attachment/useCreateAttachment";
import { toast } from "sonner";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";

export const CreateAttachmentDialog = () => {
    const [open, setOpen] = useState(false);
    const { mutate: createAttachment, isPending } = useCreateAttachment();
    const canCreate = usePermission(ACTIONS.CREATE_FILE);

    if (!canCreate) return null;

    const handleSubmit = (formData: FormData) => {
        createAttachment(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة المرفق بنجاح");
                setOpen(false);
            },
            onError: (error) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة المرفق");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white shadow-lg flex items-center gap-2 transition-all active:scale-95">
                    <Plus className="h-5 w-5" />
                    <span className="font-bold">إضافة ملحق</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] rounded-2xl p-6" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-right">إضافة ملحق جديد</DialogTitle>
                </DialogHeader>
                <AttachmentForm
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                    isLoading={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};