import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { District } from "@/types/District";
import { useRegions } from "../../hooks/regions/useRegions";

const districtSchema = z.object({
    name: z.string().min(2, "إسم الحي يجب أن يكون حرفين على الأقل"),
    regionID: z.string().min(1, "يجب اختيار المنطقة"),
});

type DistrictFormValues = z.infer<typeof districtSchema>;

interface DistrictFormProps {
    initialData?: District | null;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const DistrictForm = ({ initialData, onSubmit, onCancel, isLoading }: DistrictFormProps) => {
    const { data: regions } = useRegions();
    
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DistrictFormValues>({
        resolver: zodResolver(districtSchema),
        defaultValues: {
            name: initialData?.name || "",
            regionID: (initialData?.regionID || initialData?.region_id || initialData?.region?.id)?.toString() || "",
        }
    });

    const regionIDValue = watch("regionID");

    useEffect(() => {
        if (initialData) {
            setValue("name", initialData.name);
            setValue("regionID", (initialData.regionID || initialData.region_id || initialData.region?.id)?.toString() || "");
        } else {
            setValue("name", "");
            setValue("regionID", "");
        }
    }, [initialData, setValue]);

    const onFormSubmit = (values: DistrictFormValues) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("regionID", values.regionID);
        formData.append("region_id", values.regionID); // Fallback for snake_case
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 pt-4">
            {/* Region Selection */}
            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-end gap-1">
                    <span className="text-red-600">*</span>
                    المنطقة
                </label>
                <Select
                    onValueChange={(val) => setValue("regionID", val)}
                    value={regionIDValue}
                >
                    <SelectTrigger className="text-right h-12 rounded-xl bg-gray-50 dark:bg-muted border-none focus:ring-1 focus:ring-red-600">
                        <SelectValue placeholder="اختر المنطقة" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                        {regions?.map((region) => (
                            region.id ? (
                                <SelectItem key={region.id} value={region.id.toString()}>
                                    {region.name}
                                </SelectItem>
                            ) : null
                        ))}
                    </SelectContent>
                </Select>
                {errors.regionID && (
                    <p className="text-sm text-red-600 text-right">{errors.regionID.message}</p>
                )}
            </div>

            {/* District Name */}
            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-end gap-1">
                    <span className="text-red-600">*</span>
                    إسم الحي
                </label>
                <Input
                    placeholder="أدخل إسم الحي"
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
                    <span>{initialData ? "تحديث البيانات" : "حفظ بيانات الحي"}</span>
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
