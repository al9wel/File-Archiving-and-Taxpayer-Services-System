import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Upload, Check, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useUsers } from "@/features/users/hooks/useUsers"

const existingCharitableSchema = z.object({
    userId: z.string().min(1, "يرجى اختيار المستخدم"),
    fileType: z.string(),
    tradeName: z.string().min(2, "الاسم التجاري يجب أن يكون حرفين على الأقل").optional(),
    commercialRecord: z.any().optional(),
    activityLicense: z.any().optional(),
    tradePict: z.any().optional(),
    insuranceCard: z.any().optional(),
    propertyDocPict: z.any().optional(),
    byLawsCopy: z.any().optional(),
})

type ExistingCharitableFormValues = z.infer<typeof existingCharitableSchema>

interface ExistingCharitableCompanyTaxPayerFormProps {
    onSubmit: (formData: FormData) => void
    isLoading?: boolean
}

export const ExistingCharitableCompanyTaxPayerForm = ({ onSubmit, isLoading }: ExistingCharitableCompanyTaxPayerFormProps) => {
    const { data: users, isPending: isLoadingUsers } = useUsers()
    
    const [commRecordName, setCommRecordName] = useState<string | null>(null)
    const [licenseName, setLicenseName] = useState<string | null>(null)
    const [tradePictName, setTradePictName] = useState<string | null>(null)
    const [insuranceName, setInsuranceName] = useState<string | null>(null)
    const [propertyDocName, setPropertyDocName] = useState<string | null>(null)
    const [byLawsName, setByLawsName] = useState<string | null>(null)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ExistingCharitableFormValues>({
        resolver: zodResolver(existingCharitableSchema),
        defaultValues: {
            fileType: "CharitableCompany",
            tradeName: "",
        }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof ExistingCharitableFormValues, setter: (val: string | null) => void) => {
        const file = e.target.files?.[0]
        if (file) {
            setValue(fieldName, file)
            setter(file.name)
        }
    }

    const handleFormSubmit = (values: ExistingCharitableFormValues) => {
        const formData = new FormData()
        const fields = [
            "userId", "fileType", "tradeName", "commercialRecord",
            "activityLicense", "tradePict", "insuranceCard", "propertyDocPict",
            "byLawsCopy"
        ]

        fields.forEach(fieldName => {
            const value = values[fieldName as keyof ExistingCharitableFormValues]
            if (value !== undefined && value !== null && value !== "") {
                formData.append(fieldName, value instanceof File ? value : String(value))
            }
        })

        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8" dir="rtl">
            <Card className="p-8 rounded-3xl border shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">1</div>
                    <h2 className="text-2xl font-bold">ربط مستخدم موجود (شركة خيرية)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold">اختر المستخدم *</label>
                        <Select onValueChange={(v) => setValue("userId", v)} value={watch("userId")} disabled={isLoadingUsers}>
                            <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-none">
                                {isLoadingUsers ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                        <span className="text-muted-foreground">جاري تحميل المستخدمين...</span>
                                    </div>
                                ) : (
                                    <SelectValue placeholder="اختر المستخدم من القائمة" />
                                )}
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {users?.data.filter((user) => user.role === "Tax_Payer").map((user) => (
                                    <SelectItem key={user.id} value={user.id.toString()}>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">{user.firstName} {user.lastName}</span>
                                            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-lg">{user.role}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.userId && <p className="text-xs text-destructive">{errors.userId.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold">الاسم التجاري (اختياري)</label>
                        <Input placeholder="أدخل اسم النشاط التجاري" {...register("tradeName")} className="h-12 rounded-xl bg-muted/30 border-none" />
                        {errors.tradeName && <p className="text-xs text-destructive">{errors.tradeName.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold">نوع الملف الضريبي *</label>
                        <Input
                            value="شركة خيرية (Charitable Company)"
                            readOnly
                            className="h-12 rounded-xl bg-muted/30 border-none font-bold text-primary cursor-default focus-visible:ring-0"
                        />
                        <input type="hidden" {...register("fileType")} />
                    </div>
                </div>
            </Card>

            <Card className="p-8 rounded-3xl border shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">2</div>
                    <h2 className="text-2xl font-bold">الوثائق والمستندات القانونية</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">السجل التجاري</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {commRecordName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{commRecordName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "commercialRecord", setCommRecordName)} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">رخصة مزاولة النشاط</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {licenseName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{licenseName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "activityLicense", setLicenseName)} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">صورة اللوحة التجارية</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {tradePictName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{tradePictName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "tradePict", setTradePictName)} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">بطاقة التأمين</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {insuranceName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{insuranceName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "insuranceCard", setInsuranceName)} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">وثيقة ملكية العقار</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {propertyDocName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{propertyDocName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "propertyDocPict", setPropertyDocName)} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">نسخة من النظام الأساسي</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {byLawsName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{byLawsName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "byLawsCopy", setByLawsName)} />
                        </div>
                    </div>
                </div>
            </Card>

            <div className="flex flex-row gap-4 w-full">
                <Button
                    type="submit"
                    className="flex-[2] h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="animate-spin ml-2" /> : <Check className="ml-2" />}
                    إضافة المكلف الآن
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-14 rounded-2xl font-bold text-lg border-2"
                    onClick={() => window.history.back()}
                >
                    إلغاء
                </Button>
            </div>
        </form>
    )
}
