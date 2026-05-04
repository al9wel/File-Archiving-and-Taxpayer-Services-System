import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import type { PaymentType } from "@/types/PaymentType";

const paymentTypeSchema = z.object({
    name: z.string().min(2, "إسم نوع السداد يجب أن يكون حرفين على الأقل"),
    note: z.string().optional(),
});

type PaymentTypeFormValues = z.infer<typeof paymentTypeSchema>;

interface PaymentTypeFormProps {
    initialData?: PaymentType | null;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const PaymentTypeForm = ({ initialData, onSubmit, onCancel, isLoading }: PaymentTypeFormProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<PaymentTypeFormValues>({
        resolver: zodResolver(paymentTypeSchema),
        defaultValues: {
            name: initialData?.name || "",
            note: initialData?.note || "",
        }
    });

    useEffect(() => {
        if (initialData) {
            setValue("name", initialData.name);
            setValue("note", initialData.note || "");
        } else {
            setValue("name", "");
            setValue("note", "");
        }
    }, [initialData, setValue]);

    const onFormSubmit = (values: PaymentTypeFormValues) => {
        const formData = new FormData();
        formData.append("name", values.name);
        if (values.note) {
            formData.append("note", values.note);
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 pt-4" dir="rtl">
            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                    <span className="text-red-600">*</span>
                    إسم نوع السداد
                </label>
                <Input
                    placeholder="أدخل إسم نوع السداد"
                    {...register("name")}
                    className="text-right h-12 rounded-xl bg-muted/30 border border-muted-foreground/10 focus-visible:ring-1 focus-visible:ring-red-600"
                />
                {errors.name && (
                    <p className="text-sm text-red-600 text-right">{errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                    ملاحظات
                </label>
                <Input
                    placeholder="أدخل أي ملاحظات (اختياري)"
                    {...register("note")}
                    className="text-right h-12 rounded-xl bg-muted/30 border border-muted-foreground/10 focus-visible:ring-1 focus-visible:ring-red-600"
                />
            </div>

            <div className="flex items-center gap-4 pt-6">
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-[#911111] hover:bg-[#7a0e0e] text-white rounded-xl px-8 h-12 flex-1 flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                    {isLoading ? (
                        <Loader2 className="size-5 animate-spin" />
                    ) : (
                        <Check className="size-5" />
                    )}
                    <span>{initialData ? "تحديث البيانات" : "حفظ بيانات السداد"}</span>
                </Button>
                <Button 
                    type="button" 
                    onClick={onCancel}
                    variant="outline" 
                    className="rounded-xl px-8 h-12 border-none bg-gray-100 dark:bg-muted text-muted-foreground hover:bg-gray-200 dark:hover:bg-muted/80 transition-colors"
                >
                    إلغاء
                </Button>
            </div>
        </form>
    );
};
