import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, FileText, Loader2, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTaxTypes } from "@/features/basic-info/hooks/tax-type/useTaxTypes";
import { FileSearchSelect } from "@/features/files/components/files/FileSearchSelect";

const taxInfoSchema = z.object({
    fileId: z.string().min(1, "يجب اختيار الملف الضريبي"),
    taxTypeId: z.string().min(1, "يجب اختيار نوع الضريبة"),
    taxAmount: z.string().min(1, "يجب إدخال مبلغ الضريبة"),
    lastPayment: z.string().min(1, "يجب إدخال آخر دفعة"),
    attachment: z.any().optional(),
});

type TaxInfoFormValues = z.infer<typeof taxInfoSchema>;

interface TaxInfoFormProps {
    initialData?: {
        fileId?: string | number;
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
            fileId: initialData?.fileId?.toString() || "",
            taxTypeId: initialData?.taxTypeId?.toString() || "",
            taxAmount: initialData?.taxAmount?.toString() || "",
            lastPayment: initialData?.lastPayment?.toString() || "",
            attachment: undefined,
        }
    });

    const taxTypeId = watch("taxTypeId");

    useEffect(() => {
        if (initialData) {
            setValue("fileId", (initialData.fileId || initialData.taxPayerId)?.toString() || "");
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
                    <label className="text-sm font-medium">الملف الضريبي <span className="text-destructive">*</span></label>
                    <FileSearchSelect
                        value={watch("fileId") ? Number(watch("fileId")) : undefined}
                        onSelect={(id) => setValue("fileId", id.toString(), { shouldValidate: true })}
                        disabled={isLoading}
                    />
                    {errors.fileId && (
                        <p className="text-xs text-destructive">{errors.fileId.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">نوع الضريبة <span className="text-destructive">*</span></label>
                    <Select
                        value={taxTypeId}
                        onValueChange={(value) => setValue("taxTypeId", value, { shouldValidate: true })}
                        disabled={isLoadingTaxTypes}
                    >
                        <SelectTrigger className="w-full h-12 rounded-xl bg-muted/30">
                            <SelectValue placeholder="اختر نوع الضريبة" />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                            {taxTypes?.data?.map((taxType) => (
                                <SelectItem key={taxType.id} value={taxType.id.toString()}>
                                    {taxType.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.taxTypeId && (
                        <p className="text-xs text-destructive">{errors.taxTypeId.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">مبلغ الضريبة <span className="text-destructive">*</span></label>
                    <Input
                        type="number"
                        placeholder="0.00"
                        {...register("taxAmount")}
                        className="h-12 bg-muted/30 rounded-xl"
                    />
                    {errors.taxAmount && (
                        <p className="text-xs text-destructive">{errors.taxAmount.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">آخر دفعة <span className="text-destructive">*</span></label>
                    <Input
                        type="number"
                        placeholder="0.00"
                        {...register("lastPayment")}
                        className="h-12 bg-muted/30 rounded-xl"
                    />
                    {errors.lastPayment && (
                        <p className="text-xs text-destructive">{errors.lastPayment.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">المرفق {initialData ? "(اختياري للتحديث)" : "(مطلوب)"}</label>
                <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/5 h-[110px]">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
                        {attachmentName ? <Check size={16} /> : <Upload size={16} />}
                    </div>
                    <span className="text-xs text-muted-foreground truncate max-w-full px-2">
                        {attachmentName || "انقر لرفع ملف المرفق الضريبي"}
                    </span>
                    <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleAttachmentChange}
                    />
                </div>
                {errors.attachment && (
                    <p className="text-xs text-destructive">{errors.attachment.message as string}</p>
                )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="rounded-xl h-11 px-6 font-bold"
                >
                    إلغاء
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-xl h-11 px-6 font-bold bg-primary hover:bg-primary-hover shadow-md transition-all active:scale-95"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>جاري الحفظ...</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>{initialData ? "تحديث البيانات" : "حفظ البيانات"}</span>
                        </div>
                    )}
                </Button>
            </div>
        </form>
    );
};
