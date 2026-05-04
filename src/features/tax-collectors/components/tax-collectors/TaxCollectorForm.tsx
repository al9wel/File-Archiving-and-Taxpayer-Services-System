import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Upload } from "lucide-react";
import type { TaxCollector } from "@/types";
import { useEmploymentTypes } from "../../hooks/employment-types/useEmploymentTypes";
import { useDepartments } from "@/features/basic-info/hooks/departments/useDepartments";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const taxCollectorSchema = z.object({
    fullName: z.string().min(3, "الإسم بالكامل يجب أن يكون 3 أحرف على الأقل"),
    phone: z.string().min(6, "رقم الهاتف غير صالح"),
    jobTypeId: z.string().min(1, "الرجاء اختيار نوع الوظيفة"),
    deptID: z.string().min(1, "الرجاء اختيار القسم"),
    idCard: z.any().optional(), // File upload
});

type TaxCollectorFormValues = z.infer<typeof taxCollectorSchema>;

interface TaxCollectorFormProps {
    initialData?: TaxCollector | null;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const TaxCollectorForm = ({ initialData, onSubmit, onCancel, isLoading }: TaxCollectorFormProps) => {
    const [idCardName, setIdCardName] = useState<string | null>(null);
    const { data: jobTypes } = useEmploymentTypes();
    const { data: departments } = useDepartments();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TaxCollectorFormValues>({
        resolver: zodResolver(taxCollectorSchema),
        defaultValues: {
            fullName: initialData?.fullName || "",
            phone: initialData?.phone || "",
            jobTypeId: initialData?.jobTypeId?.toString() || "",
            deptID: initialData?.deptID?.toString() || "",
        }
    });

    useEffect(() => {
        if (initialData) {
            setValue("fullName", initialData.fullName);
            setValue("phone", initialData.phone);
            setValue("jobTypeId", initialData.jobTypeId.toString());
            setValue("deptID", initialData.deptID.toString());

            if (initialData.idCard) {
                setIdCardName(typeof initialData.idCard === 'string' ? initialData.idCard.split('/').pop() || "الملف الحالي" : "تم رفع ملف");
            }
        }
    }, [initialData, setValue]);

    const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("idCard", file);
            setIdCardName(file.name);
        }
    };

    const onFormSubmit = (values: TaxCollectorFormValues) => {
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("phone", values.phone);
        formData.append("jobTypeId", values.jobTypeId);
        formData.append("deptID", values.deptID);

        if (values.idCard && values.idCard instanceof File) {
            formData.append("idCard", values.idCard);
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 pt-4 overflow-y-auto max-h-[70vh] px-1" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                        <span className="text-red-600">*</span>
                        الإسم بالكامل
                    </label>
                    <Input
                        placeholder="أدخل الإسم بالكامل"
                        {...register("fullName")}
                        className="text-right h-12 rounded-xl bg-muted/30 border border-muted-foreground/10 focus-visible:ring-1 focus-visible:ring-red-600"
                    />
                    {errors.fullName && (
                        <p className="text-sm text-red-600 text-right">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                        <span className="text-red-600">*</span>
                        رقم الهاتف
                    </label>
                    <Input
                        placeholder="أدخل رقم الهاتف"
                        {...register("phone")}
                        className="text-right h-12 rounded-xl bg-muted/30 border border-muted-foreground/10 focus-visible:ring-1 focus-visible:ring-red-600"
                        dir="ltr"
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-600 text-right">{errors.phone.message}</p>
                    )}
                </div>

                {/* ID Card File */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                        نسخة رقمية من الهوية
                    </label>
                    <Card className="p-0 rounded-xl border shadow-sm bg-muted/10 overflow-hidden">
                        <div className="relative border-2 border-dashed border-muted-foreground/10 rounded-xl p-3 flex flex-col items-center justify-center group hover:border-red-600/50 transition-colors cursor-pointer text-center bg-transparent">
                            <div className="w-8 h-8 rounded-full bg-red-600/10 text-red-600 flex items-center justify-center mb-1 transition-transform group-hover:scale-110">
                                {idCardName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            {idCardName ? (
                                <div className="flex flex-col items-center gap-0">
                                    <span className="text-[10px] font-medium text-red-600 truncate max-w-[120px]">{idCardName}</span>
                                    <span className="text-[8px] text-muted-foreground">تم الرفع بنجاح</span>
                                </div>
                            ) : (
                                <div className="space-y-0">
                                    <span className="text-[10px] font-bold">اسحب الملف هنا</span>
                                    <p className="text-[8px] text-muted-foreground">أو انقر للاختيار</p>
                                </div>
                            )}
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept=".pdf,image/*"
                                onChange={handleIdCardChange}
                            />
                        </div>
                    </Card>
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                        <span className="text-red-600">*</span>
                        نوع التوظيف
                    </label>
                    <div className="h-12 w-full">
                        <Select
                            onValueChange={(val) => setValue("jobTypeId", val)}
                            value={watch("jobTypeId")}
                        >
                            <SelectTrigger className="text-right w-full h-full rounded-xl bg-muted/30 border border-muted-foreground/10 focus:ring-1 focus:ring-red-600">
                                <SelectValue placeholder="اختر نوع التوظيف" />
                            </SelectTrigger>
                            <SelectContent dir="rtl">
                                {jobTypes?.data?.map((type) => (
                                    <SelectItem key={type.id} value={type.id.toString()}>
                                        {type.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {errors.jobTypeId && (
                        <p className="text-sm text-red-600 text-right">{errors.jobTypeId.message}</p>
                    )}
                </div>

                {/* Department */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                        <span className="text-red-600">*</span>
                        القسم
                    </label>
                    <div className="h-12 w-full">
                        <Select
                            onValueChange={(val) => setValue("deptID", val)}
                            value={watch("deptID")}
                        >
                            <SelectTrigger className="text-right w-full h-full rounded-xl bg-muted/30 border border-muted-foreground/10 focus:ring-1 focus:ring-red-600">
                                <SelectValue placeholder="اختر القسم" />
                            </SelectTrigger>
                            <SelectContent dir="rtl">
                                {departments?.data?.map((dept) => (
                                    <SelectItem key={dept.id} value={dept.id.toString()}>
                                        {dept.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {errors.deptID && (
                        <p className="text-sm text-red-600 text-right">{errors.deptID.message}</p>
                    )}
                </div>
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
                    <span>{initialData ? "تحديث البيانات" : "حفظ بيانات المأمور"}</span>
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
