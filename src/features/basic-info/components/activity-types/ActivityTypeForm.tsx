import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import type { ActivityType } from "@/types/ActivityType";

const activityTypeSchema = z.object({
    name: z.string().min(2, "إسم نوع النشاط يجب أن يكون حرفين على الأقل"),
});

type ActivityTypeFormValues = z.infer<typeof activityTypeSchema>;

interface ActivityTypeFormProps {
    initialData?: ActivityType | null;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const ActivityTypeForm = ({ initialData, onSubmit, onCancel, isLoading }: ActivityTypeFormProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ActivityTypeFormValues>({
        resolver: zodResolver(activityTypeSchema),
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

    const onFormSubmit = (values: ActivityTypeFormValues) => {
        const formData = new FormData();
        formData.append("name", values.name);
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 pt-4">
            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-end gap-1">
                    <span className="text-red-600">*</span>
                    إسم نوع النشاط
                </label>
                <Input
                    placeholder="أدخل إسم نوع النشاط"
                    {...register("name")}
                    className="text-right h-12 rounded-xl bg-gray-50 dark:bg-muted border-none focus-visible:ring-1 focus-visible:ring-red-600"
                />
                {errors.name && (
                    <p className="text-sm text-red-600 text-right">{errors.name.message}</p>
                )}
            </div>

            <div className="flex flex-row-reverse items-center gap-4 pt-6">
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
                    <span>{initialData ? "تحديث البيانات" : "حفظ بيانات النشاط الجديد"}</span>
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
