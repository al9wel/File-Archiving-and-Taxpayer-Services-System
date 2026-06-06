import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ACTIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/usePermission";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateFileStatus } from "../../hooks/file-status/useCreateFileStatus";
import { FileStatusForm } from "./FileStatusForm";

export const CreateFileStatusDialog = () => {
  const [open, setOpen] = useState(false);
  const { mutate: createMutation, isPending } = useCreateFileStatus();
  const canCreate = usePermission(ACTIONS.CREATE_BASIC_INFO);

  if (!canCreate) return null;

  const onSubmit = (formData: FormData) => {
    createMutation(formData, {
      onSuccess: (res) => {
        toast.success(res.message || "تم إضافة حالة ملف جديدة بنجاح");
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.message || "حدث خطأ أثناء إضافة حالة الملف");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl px-6 h-12 flex items-center gap-2 shadow-lg shadow-destructive/20 transition-all active:scale-95">
          <Plus className="size-5" />
          <span className="font-bold">إضافة حالة ملف</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[calc(100vw-2rem)] sm:max-w-[500px] rounded-2xl !bg-white p-6"
        dir="rtl"
      >
        <DialogHeader className="text-right">
          <DialogTitle className="text-xl font-bold text-right">
            إضافة حالة ملف جديدة
          </DialogTitle>
        </DialogHeader>
        <FileStatusForm
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
          isLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
