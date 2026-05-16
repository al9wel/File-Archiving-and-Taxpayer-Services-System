import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTaxTypes } from "../../hooks/tax-type/useTaxTypes";
import { useTaxPayers } from "../../hooks/tax-payers/useTaxPayers";

const taxInfoSchema = z.object({
    taxPayerId: z.string().min(1, "يجب اختيار المكلف"),
    taxTypeId: z.string().min(1, "يجب اختيار نوع الضريبة"),
    taxAmount: z.string().min(1, "يجب إدخال مبلغ الضريبة"),
    lastPayment: z.string().min(1, "يجب إدخال آخر دفعة"),
});

type TaxInfoFormValues = z.infer<typeof taxInfoSchema>;

interface TaxInfoFormProps {
    initialData?: {
        taxPayerId?: string | number;
        taxTypeId?: string | number;
        taxAmount?: string | number;
        lastPayment?: string | number;
    } | null;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const TaxInfoForm = ({ initialData, onSubmit, onCancel, isLoading }: TaxInfoFormProps) => {
    const { data: taxTypes, isPending: isLoadingTaxTypes } = useTaxTypes();
    const { data: taxPayers, isPending: isLoadingTaxPayers } = useTaxPayers();

    const isDataLoading = isLoadingTaxTypes || isLoadingTaxPayers;

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TaxInfoFormValues>({
        resolver: zodResolver(taxInfoSchema),
        defaultValues: {
            taxPayerId: initialData?.taxPayerId?.toString() || "",
            taxTypeId: initialData?.taxTypeId?.toString() || "",
            taxAmount: initialData?.taxAmount?.toString() || "",
            lastPayment: initialData?.lastPayment?.toString() || "",
        }
    });

    const taxPayerId = watch("taxPayerId");
    const taxTypeId = watch("taxTypeId");

    useEffect(() => {
        if (initialData) {
            setValue("taxPayerId", initialData.taxPayerId?.toString() || "");
            setValue("taxTypeId", initialData.taxTypeId?.toString() || "");
            setValue("taxAmount", initialData.taxAmount?.toString() || "");
            setValue("lastPayment", initialData.lastPayment?.toString() || "");
        }
    }, [initialData, setValue]);

    const handleFormSubmit = (values: TaxInfoFormValues) => {
        const formData = new FormData();
        const fields = Object.keys(values) as Array<keyof TaxInfoFormValues>;

        fields.forEach(fieldName => {
            const value = values[fieldName];
            if (value !== undefined && value !== null && value !== "") {
                formData.append(fieldName, String(value));
            }
        });

        onSubmit(formData);
    };

    // If initial critical data is loading, show a full form loader to prevent "hanging"
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
                {/* Tax Payer Select */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">المكلف <span className="text-red-600">*</span></label>
                    <Select
                        disabled={isLoading || isDataLoading}
                        value={taxPayerId}
                        onValueChange={(val) => setValue("taxPayerId", val, { shouldValidate: true })}
                    >
                        <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-muted-foreground/10">
                            {isLoadingTaxPayers ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    <span className="text-muted-foreground">جاري التحميل...</span>
                                </div>
                            ) : (
                                <SelectValue placeholder="اختر المكلف" />
                            )}
                        </SelectTrigger>
                        <SelectContent>
                            {taxPayers?.data.map((payer) => (
                                <SelectItem key={payer.taxPayerId} value={payer.taxPayerId.toString()}>
                                    {payer.tradeName} - <span className="text-primary/50 mx-2">{payer.taxPayerFileType === "Individual" ? "فرد" : payer.taxPayerFileType === "Company" ? "شركة" : "شركة خيرية"}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.taxPayerId && <p className="text-xs text-red-600">{errors.taxPayerId.message}</p>}
                </div>

                {/* Tax Type Select */}
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

                {/* Tax Amount */}
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

                {/* Last Payment */}
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
