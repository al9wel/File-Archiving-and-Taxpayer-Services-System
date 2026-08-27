import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, Check, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { FileSearchSelect } from "@/features/files/components/files/FileSearchSelect"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRegions } from "@/features/basic-info/hooks/regions/useRegions"
import { useDistrictsByRegion } from "@/features/basic-info/hooks/districts/useDistrictsByRegion"
import type { Region, District } from "@/types"

const existingCharitableSchema = z.object({
    fileId: z.string().min(1, "يرجى اختيار الملف"),
    fileType: z.string(),
    tradeName: z.string().min(2, "الاسم التجاري يجب أن يكون حرفين على الأقل"),
    regionId: z.string().min(1, "يرجى اختيار المنطقة"),
    districtId: z.string().min(1, "يرجى اختيار الحي"),
    commercialRecord: z.any().refine((f) => f instanceof File, "السجل التجاري مطلوب"),
    activityLicense: z.any().refine((f) => f instanceof File, "ترخيص مزاولة النشاط مطلوب"),
    tradePict: z.any().refine((f) => f instanceof File, "صورة اللوحة التجارية مطلوبة"),
    insuranceCard: z.any().refine((f) => f instanceof File, "بطاقة التأمين مطلوبة"),
    propertyDocPict: z.any().refine((f) => f instanceof File, "وثيقة ملكية العقار / عقد الإيجار مطلوبة"),
    byLawsCopy: z.any().refine((f) => f instanceof File, "نسخة من النظام الأساسي مطلوبة"),
})

type ExistingCharitableFormValues = z.infer<typeof existingCharitableSchema>

interface ExistingCharitableCompanyTaxPayerFormProps {
    initialFileId?: string | number | null
    onSubmit: (formData: FormData) => void
    isLoading?: boolean
}

export const ExistingCharitableCompanyTaxPayerForm = ({
    initialFileId,
    onSubmit,
    isLoading
}: ExistingCharitableCompanyTaxPayerFormProps) => {
    const [selectedRegion, setSelectedRegion] = useState<number | null>(null)
    const [commRecordName, setCommRecordName] = useState<string | null>(null)
    const [licenseName, setLicenseName] = useState<string | null>(null)
    const [tradePictName, setTradePictName] = useState<string | null>(null)
    const [insuranceName, setInsuranceName] = useState<string | null>(null)
    const [propertyDocName, setPropertyDocName] = useState<string | null>(null)
    const [byLawsName, setByLawsName] = useState<string | null>(null)

    const { data: regionsData, isPending: isLoadingRegions } = useRegions()
    const { data: districtsData, isPending: isLoadingDistricts } = useDistrictsByRegion(selectedRegion!)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ExistingCharitableFormValues>({
        resolver: zodResolver(existingCharitableSchema),
        defaultValues: {
            fileId: initialFileId ? initialFileId.toString() : "",
            fileType: "CharitableCompany",
            tradeName: "",
            regionId: "",
            districtId: "",
        }
    })

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: keyof ExistingCharitableFormValues,
        setter: (val: string | null) => void
    ) => {
        const file = e.target.files?.[0]
        if (file) {
            setValue(fieldName, file, { shouldValidate: true })
            setter(file.name)
        }
    }

    const handleFormSubmit = (values: ExistingCharitableFormValues) => {
        const formData = new FormData()
        formData.append("fileId", values.fileId)
        formData.append("fileType", "CharitableCompany")
        formData.append("tradeName", values.tradeName)
        formData.append("regionId", values.regionId)
        formData.append("districtId", values.districtId)

        if (values.commercialRecord instanceof File) formData.append("commercialRecord", values.commercialRecord)
        if (values.activityLicense instanceof File) formData.append("activityLicense", values.activityLicense)
        if (values.tradePict instanceof File) formData.append("tradePict", values.tradePict)
        if (values.insuranceCard instanceof File) formData.append("insuranceCard", values.insuranceCard)
        if (values.propertyDocPict instanceof File) formData.append("propertyDocPict", values.propertyDocPict)
        if (values.byLawsCopy instanceof File) formData.append("byLawsCopy", values.byLawsCopy)

        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8" dir="rtl">
            <Card className="p-8 rounded-3xl border shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">1</div>
                    <h2 className="text-2xl font-bold">ربط النشاط بملف موجود (شركة خيرية)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold">اختر الملف الضريبي *</label>
                        <FileSearchSelect
                            value={watch("fileId") ? Number(watch("fileId")) : undefined}
                            onSelect={(id) => setValue("fileId", id.toString(), { shouldValidate: true })}
                        />
                        {errors.fileId && <p className="text-xs text-destructive">{errors.fileId.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold">الاسم التجاري / اسم الجمعية *</label>
                        <Input placeholder="أدخل اسم النشاط التجاري أو الخيري" {...register("tradeName")} className="h-12 rounded-xl bg-muted/30" />
                        {errors.tradeName && <p className="text-xs text-destructive">{errors.tradeName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold">المنطقة *</label>
                        <Select
                            onValueChange={(val) => {
                                setSelectedRegion(Number(val))
                                setValue("regionId", val, { shouldValidate: true })
                                setValue("districtId", "")
                            }}
                            value={watch("regionId")}
                            disabled={isLoadingRegions}
                        >
                            <SelectTrigger className="h-12 rounded-xl bg-muted/30">
                                <SelectValue placeholder="اختر المنطقة" />
                            </SelectTrigger>
                            <SelectContent>
                                {regionsData?.data?.map((region: Region) => (
                                    <SelectItem key={region.id} value={region.id.toString()}>{region.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.regionId && <p className="text-xs text-destructive">{errors.regionId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold">الحي *</label>
                        <Select
                            onValueChange={(val) => setValue("districtId", val, { shouldValidate: true })}
                            value={watch("districtId")}
                            disabled={!selectedRegion || isLoadingDistricts}
                        >
                            <SelectTrigger className="h-12 rounded-xl bg-muted/30">
                                <SelectValue placeholder={!selectedRegion ? "يرجى اختيار المنطقة أولاً" : "اختر الحي"} />
                            </SelectTrigger>
                            <SelectContent>
                                {districtsData?.data?.map((district: District) => (
                                    <SelectItem key={district.id} value={district.id.toString()}>{district.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.districtId && <p className="text-xs text-destructive">{errors.districtId.message}</p>}
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
                        <label className="text-sm font-bold block text-right">السجل التجاري *</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {commRecordName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{commRecordName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "commercialRecord", setCommRecordName)} />
                        </div>
                        {errors.commercialRecord && <p className="text-xs text-destructive">{errors.commercialRecord.message as string}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">رخصة مزاولة النشاط *</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {licenseName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{licenseName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "activityLicense", setLicenseName)} />
                        </div>
                        {errors.activityLicense && <p className="text-xs text-destructive">{errors.activityLicense.message as string}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">صورة اللوحة التجارية *</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {tradePictName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{tradePictName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "tradePict", setTradePictName)} />
                        </div>
                        {errors.tradePict && <p className="text-xs text-destructive">{errors.tradePict.message as string}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">بطاقة التأمين *</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {insuranceName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{insuranceName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "insuranceCard", setInsuranceName)} />
                        </div>
                        {errors.insuranceCard && <p className="text-xs text-destructive">{errors.insuranceCard.message as string}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">وثيقة ملكية العقار / عقد الإيجار *</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {propertyDocName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{propertyDocName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "propertyDocPict", setPropertyDocName)} />
                        </div>
                        {errors.propertyDocPict && <p className="text-xs text-destructive">{errors.propertyDocPict.message as string}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">نسخة من النظام الأساسي *</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {byLawsName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{byLawsName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "byLawsCopy", setByLawsName)} />
                        </div>
                        {errors.byLawsCopy && <p className="text-xs text-destructive">{errors.byLawsCopy.message as string}</p>}
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
                    إضافة نشاط شركة خيرية للملف
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
