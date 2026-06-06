import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import type { TaxType } from "@/types/TaxType";

const taxTypeSchema = z.object({
    name: z.string().min(2, "إسم نوع الضريبة يجب أن يكون حرفين على الأقل"),
});

type TaxTypeFormValues = z.infer<typeof taxTypeSchema>;

interface TaxTypeFormProps {
    initialData?: TaxType | null;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const TaxTypeForm = ({ initialData, onSubmit, onCancel, isLoading }: TaxTypeFormProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TaxTypeFormValues>({
        resolver: zodResolver(taxTypeSchema),
        defaultValues: {
            name: initialData?.name || "",
        }
    });

    useEffect(() => {
        if (initialData) {
            setValue("name", initialData.name);
        } else {
            setValue("name", "");
        }
    }, [initialData, setValue]);

    const handleFormSubmit = (values: TaxTypeFormValues) => {
        const formData = new FormData();
        const fields = ["name"];
        fields.forEach(field => {
            formData.append(field, values[field as keyof TaxTypeFormValues]);
        });
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 pt-4" dir="rtl">
            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                    <span className="text-destructive">*</span>
                     إسم نوع الضريبة
                </label>
                <Input
                    placeholder="أدخل إسم نوع الضريبة"
                    {...register("name")}
                    className="text-right h-12 rounded-xl bg-muted/30 border border-muted-foreground/10 focus-visible:ring-1 focus-visible:ring-destructive"
                />
                {errors.name && (
                    <p className="text-sm text-destructive text-right">{errors.name.message}</p>
                )}
            </div>

            <div className="flex items-center gap-4 pt-6">
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl px-8 h-12 flex-1 flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                    {isLoading ? (
                        <Loader2 className="size-5 animate-spin" />
                    ) : (
                        <Check className="size-5" />
                    )}
                    <span>{initialData ? "تحديث البيانات" : "حفظ بيانات نوع الضريبة"}</span>
                </Button>
                <Button 
                    type="button" 
                    onClick={onCancel}
                    variant="outline" 
                    className="rounded-xl px-8 h-12 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                    إلغاء
                </Button>
            </div>
        </form>
    );
};
