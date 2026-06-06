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
import { useCreateRegion } from "../../hooks/regions/useCreateRegion";
import { RegionForm } from "./RegionForm";

export const CreateRegionDialog = () => {
  const [open, setOpen] = useState(false);
  const canCreate = usePermission(ACTIONS.CREATE_BASIC_INFO);
  const { mutate: createMutation, isPending } = useCreateRegion();

  const handleSubmit = (formData: FormData) => {
    createMutation(formData, {
      onSuccess: (res) => {
        toast.success(res.message || "تم إضافة المنطقة بنجاح");
        setOpen(false);
      },
      onError: (error) => {
        toast.error(error.message || "حدث خطأ أثناء إضافة المنطقة");
      },
    });
  };

  if (!canCreate) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl px-6 h-12 flex items-center gap-2 shadow-lg shadow-destructive/20 transition-all hover:scale-105 active:scale-95">
          <Plus className="size-5" />
          <span>إضافة منطقة جديدة</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[calc(100vw-2rem)] sm:max-w-[500px] rounded-2xl !bg-white p-6"
        dir="rtl"
      >
        <DialogHeader className="text-right">
          <DialogTitle className="text-xl font-bold text-right">
            إضافة منطقة جديدة
          </DialogTitle>
        </DialogHeader>
        <RegionForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
