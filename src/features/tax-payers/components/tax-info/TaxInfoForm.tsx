import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, FileText, Loader2, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTaxTypes } from "../../hooks/tax-type/useTaxTypes";
import { TaxPayerSearchSelect } from "../tax-payers/TaxPayerSearchSelect";

const taxInfoSchema = z.object({
    taxPayerId: z.string().min(1, "يجب اختيار المكلف"),
    taxTypeId: z.string().min(1, "يجب اختيار نوع الضريبة"),
    taxAmount: z.string().min(1, "يجب إدخال مبلغ الضريبة"),
    lastPayment: z.string().min(1, "يجب إدخال آخر دفعة"),
    attachment: z.any().optional(),
});

type TaxInfoFormValues = z.infer<typeof taxInfoSchema>;

interface TaxInfoFormProps {
    initialData?: {
        taxPayerId?: string | number;
        taxTypeId?: string | number;
        taxAmount?: string | number;
        lastPayment?: string | number;
        attachment?: string;
    } | null;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const TaxInfoForm = ({ initialData, onSubmit, onCancel, isLoading }: TaxInfoFormProps) => {
    const { data: taxTypes, isPending: isLoadingTaxTypes } = useTaxTypes();
    const [attachmentName, setAttachmentName] = useState<string | null>(null);

    const isDataLoading = isLoadingTaxTypes;

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TaxInfoFormValues>({
        resolver: zodResolver(taxInfoSchema),
        defaultValues: {
            taxPayerId: initialData?.taxPayerId?.toString() || "",
            taxTypeId: initialData?.taxTypeId?.toString() || "",
            taxAmount: initialData?.taxAmount?.toString() || "",
            lastPayment: initialData?.lastPayment?.toString() || "",
            attachment: undefined,
        }
    });

    const taxTypeId = watch("taxTypeId");

    useEffect(() => {
        if (initialData) {
            setValue("taxPayerId", initialData.taxPayerId?.toString() || "");
            setValue("taxTypeId", initialData.taxTypeId?.toString() || "");
            setValue("taxAmount", initialData.taxAmount?.toString() || "");
            setValue("lastPayment", initialData.lastPayment?.toString() || "");
            setAttachmentName(initialData.attachment?.split("/").pop() || null);
        }
    }, [initialData, setValue]);

    const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("attachment", file, { shouldValidate: true });
            setAttachmentName(file.name);
        }
    };

    const handleFormSubmit = (values: TaxInfoFormValues) => {
        const formData = new FormData();
        const fields = Object.keys(values) as Array<keyof TaxInfoFormValues>;

        fields.forEach(fieldName => {
            const value = values[fieldName];
            if (value !== undefined && value !== null && value !== "") {
                formData.append(fieldName, value instanceof File ? value : String(value));
            }
        });

        onSubmit(formData);
    };

    if (isDataLoading && !initialData) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground animate-pulse">جاري تحميل البيانات...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">المكلف <span className="text-red-600">*</span></label>
                    <TaxPayerSearchSelect
                        value={watch("taxPayerId") ? Number(watch("taxPayerId")) : undefined}
                        onSelect={(id) => setValue("taxPayerId", id.toString(), { shouldValidate: true })}
                        disabled={isLoading || isDataLoading}
                    />
                    {errors.taxPayerId && <p className="text-xs text-red-600">{errors.taxPayerId.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">نوع الضريبة <span className="text-red-600">*</span></label>
                    <Select
                        disabled={isLoading || isDataLoading}
                        value={taxTypeId}
                        onValueChange={(val) => setValue("taxTypeId", val, { shouldValidate: true })}
                    >
                        <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-muted-foreground/10">
                            {isLoadingTaxTypes ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    <span className="text-muted-foreground">جاري التحميل...</span>
                                </div>
                            ) : (
                                <SelectValue placeholder="اختر نوع الضريبة" />
                            )}
                        </SelectTrigger>
                        <SelectContent>
                            {(taxTypes?.data || []).map((type: any) => (
                                <SelectItem key={type.id} value={type.id.toString()}>
                                    {type.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.taxTypeId && <p className="text-xs text-red-600">{errors.taxTypeId.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">مبلغ الضريبة <span className="text-red-600">*</span></label>
                    <Input
                        disabled={isLoading || isDataLoading}
                        placeholder="0.00"
                        type="number"
                        {...register("taxAmount")}
                        className="h-12 rounded-xl bg-muted/30 border-muted-foreground/10"
                    />
                    {errors.taxAmount && <p className="text-xs text-red-600">{errors.taxAmount.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">آخر دفعة <span className="text-red-600">*</span></label>
                    <Input
                        disabled={isLoading || isDataLoading}
                        placeholder="0.00"
                        type="number"
                        {...register("lastPayment")}
                        className="h-12 rounded-xl bg-muted/30 border-muted-foreground/10"
                    />
                    {errors.lastPayment && <p className="text-xs text-red-600">{errors.lastPayment.message}</p>}
                </div>

                <div className="space-y-3 md:col-span-2">
                    <label className="text-sm font-bold block text-right">ملحقات البيانات الضريبية</label>
                    <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                            {attachmentName ? <Check size={16} /> : <Upload size={16} />}
                        </div>
                        <div className="flex items-center gap-1 max-w-full px-2">
                            {attachmentName && <FileText size={14} className="shrink-0 text-muted-foreground" />}
                            <span className="text-[10px] text-muted-foreground truncate max-w-full">
                                {attachmentName || "انقر لرفع ملف أو صورة"}
                            </span>
                        </div>
                        <input
                            type="file"
                            accept=".pdf,image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            disabled={isLoading || isDataLoading}
                            onChange={handleAttachmentChange}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
                <Button
                    type="submit"
                    disabled={isLoading || isDataLoading}
                    className="bg-[#911111] hover:bg-[#7a0e0e] text-white rounded-xl h-12 flex-1 gap-2"
                >
                    {isLoading ? (
                        <Loader2 className="size-5 animate-spin" />
                    ) : (
                        <Check className="size-5" />
                    )}
                    <span>{initialData ? "تحديث" : "حفظ"}</span>
                </Button>
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="outline"
                    className="rounded-xl h-12 px-8 border-none bg-muted text-muted-foreground hover:bg-muted/80"
                >
                    إلغاء
                </Button>
            </div>
        </form>
    );
};
