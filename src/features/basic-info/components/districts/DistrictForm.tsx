import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import type { District } from "@/types/District";
import { useRegions } from "../../hooks/regions/useRegions";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const districtSchema = z.object({
    name: z.string().min(2, "إسم الحي يجب أن يكون حرفين على الأقل"),
    regionID: z.string().min(1, "يرجى اختيار المنطقة"),
});

type DistrictFormValues = z.infer<typeof districtSchema>;

interface DistrictFormProps {
    initialData?: District | null;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const DistrictForm = ({ initialData, onSubmit, onCancel, isLoading }: DistrictFormProps) => {
    const { data: regionsData, isPending: isLoadingRegions } = useRegions();
    const regions = regionsData?.data || [];

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DistrictFormValues>({
        resolver: zodResolver(districtSchema),
        defaultValues: {
            name: initialData?.name || "",
            regionID: initialData?.region?.id?.toString() || "",
        }
    });

    useEffect(() => {
        if (initialData) {
            setValue("name", initialData.name);
            setValue("regionID", initialData.region!.id.toString());
        }
    }, [initialData, setValue]);

    const handleFormSubmit = (values: DistrictFormValues) => {
        const formData = new FormData();
        formData.append("name", values.name)
        formData.append("regionID", values.regionID)
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 pt-4" dir="rtl">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                            <span className="text-destructive">*</span>
                            المنطقة
                    </label>
                    <div className="h-12 w-full">
                        <Select
                            disabled={isLoadingRegions}
                            onValueChange={(val) => setValue("regionID", val)}
                            value={watch("regionID")}
                            key={watch("regionID")}
                        >
                            <SelectTrigger style={{ height: "100%" }} className="w-full h-full bg-muted/30">
                                {isLoadingRegions ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                        <span className="text-muted-foreground">جاري التحميل...</span>
                                    </div>
                                ) : (
                                    <SelectValue placeholder="اختر المنطقة" />
                                )}
                            </SelectTrigger>
                            <SelectContent dir="rtl">
                                {regions.map((region) => (
                                    <SelectItem key={region.id} value={region.id.toString()}>
                                        {region.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {errors.regionID && (
                        <p className="text-sm text-destructive text-right">{errors.regionID.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                            <span className="text-destructive">*</span>
                            إسم الحي
                    </label>
                    <Input
                        placeholder="أدخل إسم الحي"
                        {...register("name")}
                        className="text-right h-12 rounded-xl bg-muted/30 border border-muted-foreground/10 focus-visible:ring-1 focus-visible:ring-destructive"
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive text-right">{errors.name.message}</p>
                    )}
                </div>
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
                    <span>{initialData ? "تحديث البيانات" : "حفظ بيانات الحي"}</span>
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
