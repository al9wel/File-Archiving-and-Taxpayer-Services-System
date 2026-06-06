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
import { useCreateTaxInfo } from "../../hooks/tax-info/useCreateTaxInfo";
import { TaxInfoForm } from "./TaxInfoForm";

export const CreateTaxInfoDialog = () => {
  const [open, setOpen] = useState(false);
  const { mutate: createInfo, isPending } = useCreateTaxInfo();
  const canCreate = usePermission(ACTIONS.CREATE_TAX_PAYER);

  if (!canCreate) return null;

  const handleSubmit = (formData: FormData) => {
    createInfo(formData, {
      onSuccess: (res) => {
        toast.success(res.message || "تم إضافة البيانات الضريبية بنجاح");
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.message || "حدث خطأ أثناء إضافة البيانات الضريبية");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg flex items-center gap-2 transition-all active:scale-95">
          <Plus className="h-5 w-5" />
          <span className="font-bold">إضافة بيانات ضريبية</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[calc(100vw-2rem)] sm:max-w-[500px] rounded-2xl !bg-white p-6"
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-right">
            إضافة بيانات ضريبية جديدة
          </DialogTitle>
        </DialogHeader>
        <TaxInfoForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
