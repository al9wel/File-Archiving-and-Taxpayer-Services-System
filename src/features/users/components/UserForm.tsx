import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    User,
    UserPlus,
    Upload,
    Check,
    UserCheck,
    UserCog,
    Loader2
} from "lucide-react"
import type { User as UserType } from "@/types/User"
import { Card } from "@/components/ui/card"
import { useDepartments } from "@/features/basic-info/hooks/useDepartments"

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

    const form = useForm<UserFormValues>({
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
            form.setValue("departmentID", initialData.departmentID.toString())
        }

        if (initialData?.userName) {
            form.setValue("userName", initialData.userName)
        }
    }, [initialData, form])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            form.setValue("image", file)
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
            form.setValue("idCard", file)
            setIdCardName(file.name)
        }
    }

    /**
     * Handles form submission by converting values into FormData.
     * Filters out fields based on Create vs Update mode.
     */
    const onFormSubmit = (values: UserFormValues) => {
        const formData = new FormData()

        // Fields allowed for BOTH Create and Update
        const commonFields = ["firstName", "lastName", "phone", "role", "departmentID", "image", "idCard"]

        commonFields.forEach(fieldName => {
            const value = values[fieldName as keyof UserFormValues]
            if (value !== undefined && value !== null && value !== "") {
                formData.append(fieldName, value as string | Blob)
            }
        })

        // userName is only for Update (according to user specs)
        if (initialData && values.userName) {
            formData.append("userName", values.userName)
        }

        console.log("Submitting User Data...", Object.fromEntries(formData.entries()))
        onSubmit(formData)
    }

    const roles = [
        { id: "Employee", label: "موظف", icon: User },
        { id: "Manager", label: "مدير", icon: UserCheck },
        { id: "Admin", label: " ادمن", icon: UserCog },
    ]

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8" dir="rtl">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Side: Form Fields (3 columns) */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Section 1: Basic Info */}
                        <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">1</span>
                                <h2 className="text-xl font-bold">البيانات الأساسية</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>الاسم الأول *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="أدخل الاسم الأول" {...field} className="h-12 bg-muted/30" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>اسم العائلة *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="أدخل اسم العائلة" {...field} className="h-12 bg-muted/30" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>رقم الهاتف *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+96777xxxxxxx" {...field} className="h-12 bg-muted/30" dir="ltr" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Section 2: Account Details */}
                        <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">2</span>
                                <h2 className="text-xl font-bold">تفاصيل الحساب والوظيفة</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="departmentID"
                                    render={({ field }) => (
                                        <FormItem className={initialData ? "" : "md:col-span-2"}>
                                            <FormLabel>القسم *</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-12 bg-muted/30">
                                                        <SelectValue placeholder={isLoadingDepts ? "جاري التحميل..." : "إختر القسم"} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {departments?.map((dept) => (
                                                        <SelectItem key={dept.id} value={dept.id.toString()}>
                                                            {dept.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {initialData && (
                                    <FormField
                                        control={form.control}
                                        name="userName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>اسم المستخدم</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="اسم المستخدم" {...field} className="h-12 bg-muted/30 text-left" dir="ltr" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel className="mb-4 block">الدور الوظيفي *</FormLabel>
                                            <div className="grid grid-cols-3 gap-4">
                                                {roles.map((role) => (
                                                    <div
                                                        key={role.id}
                                                        onClick={() => field.onChange(role.id)}
                                                        className={`
                                                            cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all
                                                            ${field.value === role.id
                                                                ? "border-primary bg-primary/5 text-primary shadow-sm"
                                                                : "border-muted bg-background hover:bg-muted/30"}
                                                        `}
                                                    >
                                                        <div className={`p-2 rounded-lg ${field.value === role.id ? "bg-primary/20" : "bg-muted"}`}>
                                                            <role.icon size={20} />
                                                        </div>
                                                        <span className="text-xs font-semibold">{role.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                type="submit"
                                size="lg"
                                className="flex-1 h-14 text-lg hover:bg-primary-hover cursor-pointer font-bold rounded-xl shadow-lg shadow-primary/20"
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
                                className="h-14 px-8 text-lg hover:bg-accent cursor-pointer font-medium rounded-xl"
                                onClick={() => window.history.back()}
                            >
                                إلغاء
                            </Button>
                        </div>
                    </div>

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
                </div>
            </form>
        </Form>
    )
}
