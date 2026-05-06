import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { TaxType } from "@/types/TaxType"

const taxTypeSchema = z.object({
    name: z.string().min(2, "اسم النوع يجب أن يكون حرفين على الأقل"),
})

type TaxTypeFormValues = z.infer<typeof taxTypeSchema>

interface TaxTypeFormProps {
    initialData?: TaxType | null
    onSubmit: (data: FormData) => void
    onCancel: () => void
    isLoading?: boolean
}

export const TaxTypeForm = ({ initialData, onSubmit, onCancel, isLoading }: TaxTypeFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TaxTypeFormValues>({
        resolver: zodResolver(taxTypeSchema),
        defaultValues: {
            name: initialData?.name || "",
        }
    })

    const onFormSubmit = (values: TaxTypeFormValues) => {
        const formData = new FormData()
        formData.append("name", values.name)
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 pt-4" dir="rtl">
            <div>
                <label className="text-sm font-medium mb-2 block text-right">اسم نوع الضريبة *</label>
                <Input placeholder="أدخل اسم نوع الضريبة" {...register("name")} className="h-12 bg-muted/30" />
                {errors.name && <p className="text-xs text-destructive mt-1 text-right">{errors.name.message}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" className="rounded-xl" onClick={onCancel} disabled={isLoading}>إلغاء</Button>
                <Button type="submit" className="rounded-xl min-w-[100px]" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "حفظ"}
                </Button>
            </div>
        </form>
    )
}
