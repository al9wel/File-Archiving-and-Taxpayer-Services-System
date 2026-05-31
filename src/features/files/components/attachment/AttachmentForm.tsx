import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, FileText, Loader2, Upload } from "lucide-react";
import { FileSearchSelect } from "../files/FileSearchSelect";

const attachmentSchema = z.object({
    title: z.string().min(1, "يجب إدخال العنوان"),
    fileId: z.string().min(1, "يجب اختيار الملف"),
    attachmentFile: z.any().optional(),
});

type AttachmentFormValues = z.infer<typeof attachmentSchema>;

interface AttachmentFormProps {
    initialData?: {
        title?: string;
        fileId?: string | number;
        attachmentFile?: string;
    } | null;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const AttachmentForm = ({ initialData, onSubmit, onCancel, isLoading }: AttachmentFormProps) => {
    const [attachmentName, setAttachmentName] = useState<string | null>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<AttachmentFormValues>({
        resolver: zodResolver(attachmentSchema),
        defaultValues: {
            title: initialData?.title?.toString() || "",
            fileId: initialData?.fileId?.toString() || "",
            attachmentFile: undefined,
        }
    });

    useEffect(() => {
        if (initialData) {
            setValue("title", initialData.title?.toString() || "");
            setValue("fileId", initialData.fileId?.toString() || "");
            setAttachmentName(initialData.attachmentFile?.split("/").pop() || null);
        }
    }, [initialData, setValue]);

    const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("attachmentFile", file, { shouldValidate: true });
            setAttachmentName(file.name);
        }
    };

    const handleFormSubmit = (values: AttachmentFormValues) => {
        const formData = new FormData();
        const fields = Object.keys(values) as Array<keyof AttachmentFormValues>;

        fields.forEach(fieldName => {
            const value = values[fieldName];
            if (value !== undefined && value !== null && value !== "") {
                formData.append(fieldName, value instanceof File ? value : String(value));
            }
        });

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">العنوان <span className="text-red-600">*</span></label>
                    <Input
                        disabled={isLoading}
                        placeholder="أدخل عنوان الملحق"
                        {...register("title")}
                        className="h-12 rounded-xl bg-muted/30 border-muted-foreground/10"
                    />
                    {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">الملف <span className="text-red-600">*</span></label>
                    <FileSearchSelect
                        value={watch("fileId") ? Number(watch("fileId")) : undefined}
                        onSelect={(id) => setValue("fileId", id.toString(), { shouldValidate: true })}
                        disabled={isLoading}
                    />
                    {errors.fileId && <p className="text-xs text-red-600">{errors.fileId.message}</p>}
                </div>

                <div className="space-y-3 md:col-span-2">
                    <label className="text-sm font-bold block text-right">الملف المرفق</label>
                    <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                            {attachmentName ? <Check size={16} /> : <Upload size={16} />}
                        </div>
                        <div className="flex items-center gap-1 max-w-full px-2">
                            {attachmentName && <FileText size={14} className="shrink-0 text-muted-foreground" />}
                            <span className="text-[10px] text-muted-foreground truncate max-w-full">
                                {attachmentName || "انقر لرفع ملف"}
                            </span>
                        </div>
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            disabled={isLoading}
                            onChange={handleAttachmentChange}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
                <Button
                    type="submit"
                    disabled={isLoading}
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