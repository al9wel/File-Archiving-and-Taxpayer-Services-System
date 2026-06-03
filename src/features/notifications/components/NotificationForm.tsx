import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Bell, Users, ShieldAlert, Globe, Save, X } from "lucide-react"
import type { Notification } from "@/types/Notification"

const notificationSchema = z.object({
    title: z.string().min(2, "عنوان الإشعار يجب أن يكون حرفين على الأقل"),
    description: z.string().min(2, "الوصف يجب أن يكون حرفين على الأقل"),
    notificationType: z.string().min(2, "يرجى تحديد نوع الإشعار"),
    receiverPhone: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.notificationType === "Special" && (!data.receiverPhone || data.receiverPhone.length < 9)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "رقم الهاتف مطلوب عند اختيار إشعار خاص",
            path: ["receiverPhone"],
        })
    }
})

type NotificationFormValues = z.infer<typeof notificationSchema>

interface NotificationFormProps {
    initialData?: Notification | null
    onSubmit: (data: FormData) => void
    onCancel?: () => void
    isLoading?: boolean
}

const types = [
    { id: "General", label: "عام", icon: Globe, className: "data-[selected=true]:border-sky-300 data-[selected=true]:bg-sky-50 data-[selected=true]:text-sky-700 dark:data-[selected=true]:bg-sky-900/20" },
    { id: "ForSystemUsers", label: "مستخدمي النظام", icon: ShieldAlert, className: "data-[selected=true]:border-violet-300 data-[selected=true]:bg-violet-50 data-[selected=true]:text-violet-700 dark:data-[selected=true]:bg-violet-900/20" },
    { id: "ForTaxPayers", label: "المكلفين", icon: Users, className: "data-[selected=true]:border-emerald-300 data-[selected=true]:bg-emerald-50 data-[selected=true]:text-emerald-700 dark:data-[selected=true]:bg-emerald-900/20" },
    { id: "Special", label: "خاص", icon: Bell, className: "data-[selected=true]:border-rose-300 data-[selected=true]:bg-rose-50 data-[selected=true]:text-rose-700 dark:data-[selected=true]:bg-rose-900/20" },
]

export const NotificationForm = ({ initialData, onSubmit, onCancel, isLoading }: NotificationFormProps) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<NotificationFormValues>({
        resolver: zodResolver(notificationSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            notificationType: initialData?.notificationType || "General",
            receiverPhone: initialData?.notificationType === "Special" ? (initialData.receiverPhone || "") : "",
        }
    })

    const selectedType = watch("notificationType")

    useEffect(() => {
        if (initialData) {
            setValue("title", initialData.title)
            setValue("description", initialData.description)
            setValue("notificationType", initialData.notificationType)
            setValue("receiverPhone", initialData.notificationType === "Special" ? (initialData.receiverPhone || "") : "")
        }
    }, [initialData, setValue])

    const handleFormSubmit = (data: NotificationFormValues) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("notificationType", data.notificationType)

        if (data.notificationType === "Special" && data.receiverPhone) {
            formData.append("receiverPhone", data.receiverPhone)
        }

        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5" dir="rtl">
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="border-b border-border/80 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Bell size={22} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-foreground">بيانات الإشعار</h2>
                            <p className="text-sm text-muted-foreground font-bold">حدد المحتوى ونوع المستلمين قبل الحفظ.</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-5">
                        <div className="space-y-5">
                            <div>
                                <label className="text-sm font-bold text-foreground mb-2 block">
                                    عنوان الإشعار *
                                </label>
                                <Input
                                    placeholder="أدخل عنوان الإشعار"
                                    {...register("title")}
                                    className="h-11 rounded-xl bg-background border-border font-bold"
                                    disabled={isLoading}
                                />
                                {errors.title && <p className="text-sm font-medium text-destructive mt-1">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-bold text-foreground mb-2 block">
                                    وصف الإشعار *
                                </label>
                                <textarea
                                    {...register("description")}
                                    placeholder="أدخل محتوى الإشعار هنا..."
                                    className="w-full min-h-[132px] p-4 rounded-xl bg-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary text-sm resize-y leading-6"
                                    disabled={isLoading}
                                />
                                {errors.description && <p className="text-sm font-medium text-destructive mt-1">{errors.description.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-sm font-bold text-foreground mb-2 block">
                                    نوع الإشعار *
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {types.map((type) => {
                                        const isSelected = selectedType === type.id
                                        const Icon = type.icon

                                        return (
                                            <button
                                                key={type.id}
                                                type="button"
                                                data-selected={isSelected}
                                                onClick={() => !isLoading && setValue("notificationType", type.id)}
                                                disabled={isLoading}
                                                className={`h-20 rounded-xl border border-border bg-background px-3 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${type.className}`}
                                            >
                                                <div className="flex h-full flex-col items-center justify-center gap-2">
                                                    <Icon size={20} />
                                                    <span className="text-xs font-black text-center leading-4">{type.label}</span>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                                {errors.notificationType && <p className="text-sm font-medium text-destructive mt-1">{errors.notificationType.message}</p>}
                            </div>

                            {selectedType === "Special" && (
                                <div className="animate-in slide-in-from-top-2 duration-300">
                                    <label className="text-sm font-bold text-foreground mb-2 block">
                                        رقم هاتف المستلم *
                                    </label>
                                    <Input
                                        placeholder="+96777xxxxxxx"
                                        {...register("receiverPhone", {
                                            onChange: (e) => {
                                                e.target.value = e.target.value.replace(/[^0-9+]/g, "")
                                            }
                                        })}
                                        className="h-11 rounded-xl bg-background border-border font-mono"
                                        dir="ltr"
                                        disabled={isLoading}
                                    />
                                    {errors.receiverPhone && <p className="text-sm font-medium text-destructive mt-1">{errors.receiverPhone.message}</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="h-12 rounded-xl px-8 font-bold cursor-pointer"
                    >
                        <X className="ml-2 h-5 w-5" />
                        إلغاء
                    </Button>
                )}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 rounded-xl px-10 bg-primary hover:bg-primary-hover shadow-sm transition-all active:scale-95 text-primary-foreground font-black cursor-pointer"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                            جاري الحفظ...
                        </>
                    ) : (
                        <>
                            <Save className="ml-2 h-5 w-5" />
                            حفظ البيانات
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}
