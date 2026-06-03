import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Upload, Check, Loader2 } from "lucide-react"
import type { IndividualTaxPayer } from "@/types/IndividualTaxPayer"
import { Card } from "@/components/ui/card"
import { AdminDepartmentSelect } from "@/features/basic-info/components/departments/AdminDepartmentSelect"
import { useAuth } from "@/hooks/useAuth"
import { ROLES } from "@/constants/roles"

const taxPayerSchema = z.object({
    firstName: z.string().min(2, "الاسم الأول يجب أن يكون حرفين على الأقل"),
    lastName: z.string().min(2, "اسم العائلة يجب أن يكون حرفين على الأقل"),
    phone: z.string().min(9, "رقم الهاتف غير صحيح"),
    role: z.string(),
    departmentID: z.string().min(1, "يرجى اختيار القسم"),
    fileType: z.enum(["Individual", "Company"]),
    tradeName: z.string().min(2, "الاسم التجاري يجب أن يكون حرفين على الأقل"),
    image: z.any().optional(),
    idCard: z.any().optional(),
    commercialRecord: z.any().optional(),
    activityLicense: z.any().optional(),
    tradePict: z.any().optional(),
    insuranceCard: z.any().optional(),
    propertyDocPict: z.any().optional(),
})

type IndividualTaxPayerFormValues = z.infer<typeof taxPayerSchema>

interface IndividualTaxPayerFormProps {
    initialData?: IndividualTaxPayer | null
    onSubmit: (formData: FormData) => void
    isLoading?: boolean
}
export const IndividualTaxPayerForm = ({ initialData, onSubmit, isLoading }: IndividualTaxPayerFormProps) => {
    const { user } = useAuth()
    const isAdmin = user?.role === ROLES.ADMIN

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [idCardName, setIdCardName] = useState<string | null>(null)
    const [commRecordName, setCommRecordName] = useState<string | null>(null)
    const [licenseName, setLicenseName] = useState<string | null>(null)
    const [tradePictName, setTradePictName] = useState<string | null>(null)
    const [insuranceName, setInsuranceName] = useState<string | null>(null)
    const [propertyDocName, setPropertyDocName] = useState<string | null>(null)

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<IndividualTaxPayerFormValues>({
        resolver: zodResolver(taxPayerSchema),
        defaultValues: {
            firstName: (initialData?.userInfo?.fullName || "").split(' ')[0] || "",
            lastName: (initialData?.userInfo?.fullName || "").split(' ').slice(1).join(' ') || "",
            phone: initialData?.userInfo?.phone || "",
            role: initialData?.userInfo.role || "Tax_Payer",
            departmentID: initialData?.userInfo.department?.id.toString() || "1",
            fileType: "Individual",
            tradeName: initialData?.taxPayerInfo?.tradeName || "",
        }
    })

    useEffect(() => {
        if (!isAdmin && user?.department?.id) {
            setValue("departmentID", user.department.id.toString())
        }

        if (initialData) {
            reset({
                firstName: initialData.userInfo?.firstName || "",
                lastName: initialData.userInfo?.lastName || "",
                phone: initialData.userInfo?.phone || "",
                role: initialData.userInfo?.role || "Tax_Payer",
                departmentID: isAdmin ? initialData.userInfo?.department?.id.toString() : user?.department?.id?.toString(),
                fileType: "Individual",
                tradeName: initialData.taxPayerInfo?.tradeName || "",
            });

            if (initialData.userInfo?.image) setImagePreview(initialData.userInfo.image);
            if (initialData.userInfo?.idCard) setIdCardName(initialData.userInfo.idCard.split('/').pop() || "الملف الحالي");
            if (initialData.taxPayerInfo?.commercialRecord) setCommRecordName(initialData.taxPayerInfo.commercialRecord.split('/').pop() || "الملف الحالي");
            if (initialData.taxPayerInfo?.activityLicense) setLicenseName(initialData.taxPayerInfo.activityLicense.split('/').pop() || "الملف الحالي");
            if (initialData.taxPayerInfo?.tradePict) setTradePictName(initialData.taxPayerInfo.tradePict.split('/').pop() || "الملف الحالي");
            if (initialData.taxPayerInfo?.insuranceCard) setInsuranceName(initialData.taxPayerInfo.insuranceCard.split('/').pop() || "الملف الحالي");
            if (initialData.taxPayerInfo?.propertyDocPict) setPropertyDocName(initialData.taxPayerInfo.propertyDocPict.split('/').pop() || "الملف الحالي");
        }
    }, [initialData, isAdmin, reset, setValue, user?.department?.id])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof IndividualTaxPayerFormValues, setter: (val: string | null) => void) => {
        const file = e.target.files?.[0]
        if (file) {
            setValue(fieldName, file)
            setter(file.name)
            if (fieldName === "image") {
                const reader = new FileReader()
                reader.onloadend = () => setImagePreview(reader.result as string)
                reader.readAsDataURL(file)
            }
        }
    }

    const handleFormSubmit = (values: IndividualTaxPayerFormValues) => {
        const formData = new FormData()
        const fields = [
            "firstName", "lastName", "phone", "role", "departmentID",
            "fileType", "tradeName", "image", "idCard", "commercialRecord",
            "activityLicense", "tradePict", "insuranceCard", "propertyDocPict"
        ]

        fields.forEach(fieldName => {
            const value = values[fieldName as keyof IndividualTaxPayerFormValues]
            const isUnchangedPhone = fieldName === "phone" && initialData && value === initialData.userInfo?.phone;
            
            if (value !== undefined && value !== null && value !== "" && !isUnchangedPhone) {
                formData.append(fieldName, value instanceof File ? value : String(value))
            }
        })

        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8" dir="rtl">
            {/* Section 1: Basic Info */}
            <Card className="p-8 rounded-3xl border shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">1</div>
                    <h2 className="text-2xl font-bold">البيانات الأساسية للمكلف</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold block">الصورة الشخصية</label>
                        <div className="flex items-center gap-6 p-4 rounded-2xl bg-muted/5 border-2 border-dashed border-muted-foreground/10">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-background shadow-md">
                                    {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <User size={40} className="text-muted-foreground" />}
                                </div>
                                <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                                    <Upload size={14} /><input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, "image", setImagePreview)} />
                                </label>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">صورة الملف الشخصي</p>
                                <p className="text-xs text-muted-foreground">صورة رسمية واضحة</p>
                            </div>
                        </div>
                    </div>

                    {/* ID Card */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold block text-right">بطاقة الهوية *</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {idCardName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{idCardName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "idCard", setIdCardName)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold">الاسم الأول *</label>
                        <Input placeholder="أدخل الاسم الأول" {...register("firstName")} className="h-12 rounded-xl bg-muted/30 border-none" />
                        {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">اسم العائلة *</label>
                        <Input placeholder="أدخل اسم العائلة" {...register("lastName")} className="h-12 rounded-xl bg-muted/30 border-none" />
                        {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">رقم الهاتف *</label>
                        <Input placeholder="7xxxxxxxx" {...register("phone")} className="h-12 rounded-xl bg-muted/30 border-none" dir="ltr" />
                        {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">القسم الضريبي *</label>
                        {isAdmin ? (
                            <AdminDepartmentSelect setValue={setValue} watch={watch} fieldName="departmentID" />
                        ) : (
                            <Input
                                value={user?.department?.name || ""}
                                readOnly
                                className="h-12 rounded-xl bg-muted/30 border-none cursor-default focus-visible:ring-0"
                            />
                        )}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold">الاسم التجاري *</label>
                        <Input placeholder="أدخل اسم النشاط التجاري" {...register("tradeName")} className="h-12 rounded-xl bg-muted/30 border-none" />
                        {errors.tradeName && <p className="text-xs text-destructive">{errors.tradeName.message}</p>}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold">نوع الملف الضريبي *</label>
                        <Input
                            value="فردي (Individual)"
                            readOnly
                            className="h-12 rounded-xl bg-muted/30 border-none font-bold text-primary cursor-default focus-visible:ring-0"
                        />
                        <input type="hidden" {...register("fileType")} />
                    </div>
                </div>
            </Card>

            {/* Section 2: Documents */}
            <Card className="p-8 rounded-3xl border shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">2</div>
                    <h2 className="text-2xl font-bold">الوثائق والمستندات القانونية</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Comm Record */}
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

                    {/* License */}
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

                    {/* Trade Pict */}
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

                    {/* Insurance */}
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

                    {/* Property Doc */}
                    <div className="space-y-3 md:col-span-2">
                        <label className="text-sm font-bold block text-right">وثيقة ملكية العقار</label>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5 h-[100px]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                {propertyDocName ? <Check size={16} /> : <Upload size={16} />}
                            </div>
                            <span className="text-[10px] text-muted-foreground truncate max-w-full px-2">{propertyDocName || "انقر للرفع"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, "propertyDocPict", setPropertyDocName)} />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-row gap-4 w-full">
                <Button
                    type="submit"
                    className="flex-[2] h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="animate-spin ml-2" /> : <Check className="ml-2" />}
                    {initialData ? "حفظ كافة التعديلات" : "إضافة المكلف الآن"}
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
