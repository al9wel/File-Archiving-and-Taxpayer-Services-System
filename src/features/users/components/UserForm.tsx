import { useEffect, useState } from "react"
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
import {
    User,
    UserPlus,
    Upload,
    Check,
    UserCheck,
    UserCog,
    Loader2,
} from "lucide-react"
import type { User as UserType } from "@/types/User"
import { Card } from "@/components/ui/card"
import { useDepartments } from "@/features/basic-info/hooks/departments/useDepartments"

const userSchema = z.object({
    firstName: z.string().min(2, "الاسم الأول يجب أن يكون حرفين على الأقل"),
    lastName: z.string().min(2, "اسم العائلة يجب أن يكون حرفين على الأقل"),
    phone: z.string().min(9, "رقم الهاتف غير صحيح"),
    userName: z.string().optional().or(z.literal('')),
    role: z.string().min(1, "يرجى اختيار الدور الوظيفي"),
    departmentID: z.string().min(1, "يرجى اختيار القسم"),
    image: z.any().optional(),
    idCard: z.any().optional(),
})

type UserFormValues = z.infer<typeof userSchema>

interface UserFormProps {
    initialData?: UserType | null
    onSubmit: (data: FormData) => void
    isLoading?: boolean
}

export const UserForm = ({ initialData, onSubmit, isLoading }: UserFormProps) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [idCardName, setIdCardName] = useState<string | null>(null)
    const { data: departments, isLoading: isLoadingDepts } = useDepartments()

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: initialData?.firstName || "",
            lastName: initialData?.lastName || "",
            phone: initialData?.phone || "",
            userName: initialData?.userName || "",
            role: initialData?.role || "",
            departmentID: initialData?.departmentID?.toString() || "1",
        }
    })

    // Watch for initialData changes
    useEffect(() => {
        if (initialData?.image) {
            setImagePreview(initialData.image)
        }

        if (initialData?.idCard) {
            setIdCardName(typeof initialData.idCard === 'string' ? initialData.idCard.split('/').pop() || "الملف الحالي" : "تم رفع ملف")
        }

        if (initialData?.departmentID) {
            setValue("departmentID", initialData.departmentID.toString())
        }

        if (initialData?.userName) {
            setValue("userName", initialData.userName)
        }
    }, [initialData, setValue])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setValue("image", file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setValue("idCard", file)
            setIdCardName(file.name)
        }
    }

    const onFormSubmit = (values: UserFormValues) => {
        const formData = new FormData()

        const commonFields = ["firstName", "lastName", "phone", "role", "departmentID", "image", "idCard"]

        commonFields.forEach(fieldName => {
            const value = values[fieldName as keyof UserFormValues]
            if (value !== undefined && value !== null && value !== "") {
                formData.append(fieldName, value as string | Blob)
            }
        })

        if (initialData && values.userName) {
            formData.append("userName", values.userName)
        }

        onSubmit(formData)
    }

    const roles = [
        { id: "Employee", label: "موظف", icon: User },
        { id: "Manager", label: "مدير", icon: UserCheck },
        { id: "Admin", label: "ادمن", icon: UserCog },
    ]

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8" dir="rtl">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Right Side: Uploads (1 column) */}
                <div className="space-y-8">
                    {/* Avatar Upload */}
                    <Card className="p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 border shadow-sm">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-background shadow-md">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={64} className="text-muted-foreground" />
                                )}
                            </div>
                            <label className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                                <Upload size={16} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold">الصورة الشخصية</h3>
                            <p className="text-xs text-muted-foreground">تنسيق JPG أو PNG، بحد أقصى 5 ميجابايت</p>
                        </div>
                    </Card>

                    {/* ID Card Upload */}
                    <Card className="p-8 rounded-2xl space-y-4 border shadow-sm">
                        <h3 className="font-bold text-center">بطاقة الهوية (نسخة رقمية) *</h3>
                        <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-8 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer text-center bg-muted/5">
                            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                {idCardName ? <Check size={24} /> : <Upload size={24} />}
                            </div>
                            {idCardName ? (
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-sm font-medium text-primary truncate max-w-[150px]">{idCardName}</span>
                                    <span className="text-xs text-muted-foreground">تم رفع الملف بنجاح</span>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <span className="text-sm font-bold">اسحب الملف هنا</span>
                                    <p className="text-xs text-muted-foreground">أو انقر للاختيار من الجهاز</p>
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
                {/* Left Side: Form Fields (3 columns) */}
                <div className="xl:col-span-3 space-y-8">
                    {/* Section 1: Basic Info */}
                    <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">1</span>
                            <h2 className="text-xl font-bold">البيانات الأساسية</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                    الاسم الأول *
                                </label>
                                <Input placeholder="أدخل الاسم الأول" {...register("firstName")} className="h-12 bg-muted/30" />
                                {errors.firstName && <p className="text-sm font-medium text-destructive mt-1">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                    اسم العائلة *
                                </label>
                                <Input placeholder="أدخل اسم العائلة" {...register("lastName")} className="h-12 bg-muted/30" />
                                {errors.lastName && <p className="text-sm font-medium text-destructive mt-1">{errors.lastName.message}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                    رقم الهاتف *
                                </label>
                                <Input placeholder="+96777xxxxxxx" {...register("phone")} className="h-12 bg-muted/30" dir="ltr" />
                                {errors.phone && <p className="text-sm font-medium text-destructive mt-1">{errors.phone.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Account Details */}
                    <div className="bg-card p-6 pb-2 rounded-2xl border shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">2</span>
                            <h2 className="text-xl font-bold">تفاصيل الحساب والوظيفة</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-1">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                    القسم *
                                </label>
                                <div className="h-12 w-full">
                                    <Select
                                        onValueChange={(val) => setValue("departmentID", val)}
                                        defaultValue={watch("departmentID")}
                                        value={watch("departmentID")}
                                    >
                                        <SelectTrigger style={{ height: "100%" }} className="w-full h-full bg-muted/30">
                                            <SelectValue placeholder={isLoadingDepts ? "جاري التحميل..." : "إختر القسم"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments?.map((dept) => (
                                                <SelectItem key={dept.id} value={dept.id.toString()}>
                                                    {dept.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {errors.departmentID && <p className="text-sm font-medium text-destructive mt-1">{errors.departmentID.message}</p>}
                            </div>
                            {initialData && (
                                <div>
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                        اسم المستخدم
                                    </label>
                                    <Input placeholder="اسم المستخدم" {...register("userName")} className="h-12 bg-muted/30 text-left" dir="ltr" />
                                    {errors.userName && <p className="text-sm font-medium text-destructive mt-1">{errors.userName.message}</p>}
                                </div>
                            )}
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4 block">
                                    الدور الوظيفي *
                                </label>
                                <div className="grid grid-cols-3 pb-2 gap-4">
                                    {roles.map((role) => (
                                        <div
                                            key={role.id}
                                            onClick={() => setValue("role", role.id)}
                                            className={`
                                                cursor-pointer p-2 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all
                                                ${watch("role") === role.id
                                                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                                                    : "border-muted bg-background hover:bg-muted/30"}
                                            `}
                                        >
                                            <div className={`p-2 rounded-lg ${watch("role") === role.id ? "bg-primary/30" : "bg-muted"}`}>
                                                <role.icon className="size-4 xl:size-5.5" />
                                            </div>
                                            <span className="text-xs font-semibold">{role.label}</span>
                                        </div>
                                    ))}
                                </div>
                                {errors.role && <p className="text-sm font-medium text-destructive mt-1">{errors.role.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Action Buttons */}
            <div className="grid grid-cols-3 xl:pr-80 xl:grid-cols-4 gap-2 xl:gap-8 mb-8">
                <Button
                    type="submit"
                    size="lg"
                    className="col-span-2 xl:col-span-3 h-12 lg:h-14 text-sm md:text-lg hover:bg-primary-hover cursor-pointer font-bold rounded-xl shadow-lg shadow-primary/20"
                    disabled={isLoading}
                >
                    <div className="flex items-center justify-center gap-2">
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <UserPlus className="h-5 w-5" />
                        )}
                        <span>
                            {isLoading ? "جاري الحفظ..." : (initialData ? "تحديث بيانات المستخدم" : "حفظ بيانات المستخدم الجديد")}
                        </span>
                    </div>
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="h-12 lg:h-14 text-sm md:text-lg px-8 hover:bg-accent cursor-pointer font-medium rounded-xl"
                    onClick={() => window.history.back()}
                >
                    إلغاء
                </Button>
            </div>
        </form>
    )
}