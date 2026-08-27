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
    Check,
    Loader2,
    Upload,
    User as UserIcon,
    UserPlus,
    UserCheck,
} from "lucide-react"
import type { File } from "@/types/File"
import { Card } from "@/components/ui/card"
import { AdminDepartmentSelect } from "@/features/basic-info/components/departments/AdminDepartmentSelect"
import { UserSearchSelect } from "@/features/users/components/UserSearchSelect"
import { useFileStatuses } from "@/features/basic-info/hooks/file-status/useFileStatuses"
import { useActivityTypes } from "@/features/basic-info/hooks/activity-types/useActivityTypes"
import { usePaymentTypes } from "@/features/basic-info/hooks/payment-types/usePaymentTypes"
import type { FileStatus } from "@/types/FileStatus"
import type { ActivityType, PaymentType } from "@/types"
import { useAuth } from "@/hooks/useAuth"
import { ROLES } from "@/constants/roles"

const createFileWithUserSchema = z.object({
    // User fields
    firstName: z.string().min(2, "الاسم الأول يجب أن يكون حرفين على الأقل"),
    lastName: z.string().min(2, "اسم العائلة يجب أن يكون حرفين على الأقل"),
    phone: z.string().length(9, "رقم الهاتف غير صحيح").startsWith("7", "يجب أن يبدأ الرقم بـ 7"),
    role: z.string().default("Tax_Payer"),
    departmentID: z.string().min(1, "يرجى اختيار القسم"),
    idCard: z.any().refine((file) => file instanceof File || (typeof file === "string" && file.length > 0), "ملف البطاقة الشخصية (PDF) مطلوب"),
    image: z.any().refine((file) => file instanceof File || (typeof file === "string" && file.length > 0), "الصورة الشخصية مطلوبة"),

    // File fields
    inventoryNumber: z.string().min(1, "رقم الحصر مطلوب"),
    taxNumber: z.string().optional().or(z.literal("")),
    docsCount: z.string().min(1, "عدد المستندات مطلوب"),
    departmentId: z.string().min(1, "يرجى اختيار قسم الملف"),
    fileStatusId: z.string().min(1, "يرجى اختيار حالة الملف"),
    activityTypeId: z.string().min(1, "يرجى اختيار نوع النشاط"),
    paymentTypeId: z.string().min(1, "يرجى اختيار نوع الدفع"),
    activityStartDate: z.string().optional().or(z.literal("")),
    note: z.string().optional(),
    requestId: z.string().optional(),
})

const createFileExistingUserSchema = z.object({
    userId: z.string().min(1, "يرجى اختيار المكلف (المستخدم)"),
    inventoryNumber: z.string().min(1, "رقم الحصر مطلوب"),
    taxNumber: z.string().optional().or(z.literal("")),
    docsCount: z.string().min(1, "عدد المستندات مطلوب"),
    departmentId: z.string().min(1, "يرجى اختيار قسم الملف"),
    fileStatusId: z.string().min(1, "يرجى اختيار حالة الملف"),
    activityTypeId: z.string().min(1, "يرجى اختيار نوع النشاط"),
    paymentTypeId: z.string().min(1, "يرجى اختيار نوع الدفع"),
    activityStartDate: z.string().optional().or(z.literal("")),
    note: z.string().optional(),
    requestId: z.string().optional(),
})

const editFileSchema = z.object({
    inventoryNumber: z.string().min(1, "رقم الحصر مطلوب"),
    taxNumber: z.string().optional().or(z.literal("")),
    docsCount: z.string().min(1, "عدد المستندات مطلوب"),
    departmentId: z.string().min(1, "يرجى اختيار قسم الملف"),
    fileStatusId: z.string().min(1, "يرجى اختيار حالة الملف"),
    activityTypeId: z.string().min(1, "يرجى اختيار نوع النشاط"),
    paymentTypeId: z.string().min(1, "يرجى اختيار نوع الدفع"),
    activityStartDate: z.string().optional().or(z.literal("")),
    note: z.string().optional(),
})

interface FileFormProps {
    initialData?: File['fileInfo'] | null
    onSubmit: (data: FormData, mode: "with-user" | "existing-user" | "edit") => void
    isLoading?: boolean
    initialUserId?: string | number | null
    requestId?: string | number | null
}

export const FileForm = ({ initialData, onSubmit, isLoading, initialUserId, requestId }: FileFormProps) => {
    const { user } = useAuth()
    const isAdmin = user?.role === ROLES.ADMIN
    const isEdit = Boolean(initialData)

    const [creationMode, setCreationMode] = useState<"with-user" | "existing-user">("with-user")
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [idCardName, setIdCardName] = useState<string | null>(null)

    const { data: fileStatuses, isPending: isLoadingFileStatuses } = useFileStatuses()
    const { data: activityTypes, isPending: isLoadingActivityTypes } = useActivityTypes()
    const { data: paymentTypes, isPending: isLoadingPaymentTypes } = usePaymentTypes()

    const currentSchema = isEdit
        ? editFileSchema
        : creationMode === "with-user"
            ? createFileWithUserSchema
            : createFileExistingUserSchema

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<any>({
        resolver: zodResolver(currentSchema),
        defaultValues: {
            // User defaults
            firstName: "",
            lastName: "",
            phone: "",
            role: "Tax_Payer",
            departmentID: user?.departmentID?.toString() || "1",
            userId: initialUserId ? initialUserId.toString() : "",

            // File defaults
            inventoryNumber: initialData?.inventoryNumber?.toString() || "",
            taxNumber: initialData?.taxNumber?.toString() || "",
            docsCount: initialData?.docsCount?.toString() || "",
            departmentId: initialData?.department?.id?.toString() || user?.departmentID?.toString() || "1",
            fileStatusId: initialData?.fileStatus?.id?.toString() || "",
            activityTypeId: initialData?.activityType?.id?.toString() || "",
            paymentTypeId: initialData?.paymentType?.id?.toString() || "",
            activityStartDate: initialData?.activityStartDate || "",
            note: initialData?.note || "",
            requestId: requestId ? requestId.toString() : "",
        }
    })

    useEffect(() => {
        if (!isAdmin && user?.departmentID) {
            setValue("departmentID", user.departmentID.toString())
            setValue("departmentId", user.departmentID.toString())
        }

        if (initialUserId && !initialData) {
            setCreationMode("existing-user")
            setValue("userId", initialUserId.toString(), { shouldValidate: true })
        }

        if (initialData) {
            reset({
                inventoryNumber: initialData.inventoryNumber?.toString() || "",
                taxNumber: initialData.taxNumber?.toString() || "",
                docsCount: initialData.docsCount?.toString() || "",
                departmentId: initialData.department?.id?.toString() || "",
                fileStatusId: initialData.fileStatus?.id?.toString() || "",
                activityTypeId: initialData.activityType?.id?.toString() || "",
                paymentTypeId: initialData.paymentType?.id?.toString() || "",
                activityStartDate: initialData.activityStartDate || "",
                note: initialData.note || "",
            })
        }
    }, [initialData, isAdmin, setValue, reset, user?.departmentID, initialUserId])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, setter?: (name: string) => void) => {
        const file = e.target.files?.[0]
        if (file) {
            setValue(fieldName, file, { shouldValidate: true })
            if (setter) setter(file.name)
            if (fieldName === "image") {
                const reader = new FileReader()
                reader.onloadend = () => setImagePreview(reader.result as string)
                reader.readAsDataURL(file)
            }
        }
    }

    const handleFormSubmit = (values: any) => {
        const formData = new FormData()

        if (isEdit) {
            formData.append("inventoryNumber", values.inventoryNumber)
            if (values.taxNumber) formData.append("taxNumber", values.taxNumber)
            formData.append("docsCount", values.docsCount)
            formData.append("departmentId", values.departmentId)
            formData.append("fileStatusId", values.fileStatusId)
            formData.append("activityTypeId", values.activityTypeId)
            formData.append("paymentTypeId", values.paymentTypeId)
            if (values.activityStartDate) formData.append("activityStartDate", values.activityStartDate)
            if (values.note) formData.append("note", values.note)
            onSubmit(formData, "edit")
            return
        }

        if (creationMode === "with-user") {
            // User fields
            formData.append("firstName", values.firstName)
            formData.append("lastName", values.lastName)
            formData.append("phone", values.phone)
            formData.append("role", "Tax_Payer")
            formData.append("departmentID", values.departmentID || values.departmentId)

            if (values.idCard instanceof File) {
                formData.append("idCard", values.idCard)
            }
            if (values.image instanceof File) {
                formData.append("image", values.image)
            }

            // File fields
            formData.append("inventoryNumber", values.inventoryNumber)
            if (values.taxNumber) formData.append("taxNumber", values.taxNumber)
            formData.append("docsCount", values.docsCount)
            formData.append("departmentId", values.departmentId)
            formData.append("fileStatusId", values.fileStatusId)
            formData.append("activityTypeId", values.activityTypeId)
            formData.append("paymentTypeId", values.paymentTypeId)
            if (values.activityStartDate) formData.append("activityStartDate", values.activityStartDate)
            if (values.note) formData.append("note", values.note)
            if (values.requestId) formData.append("requestId", values.requestId)

            onSubmit(formData, "with-user")
        } else {
            // Existing user mode
            formData.append("userId", values.userId)
            formData.append("inventoryNumber", values.inventoryNumber)
            if (values.taxNumber) formData.append("taxNumber", values.taxNumber)
            formData.append("docsCount", values.docsCount)
            formData.append("departmentId", values.departmentId)
            formData.append("fileStatusId", values.fileStatusId)
            formData.append("activityTypeId", values.activityTypeId)
            formData.append("paymentTypeId", values.paymentTypeId)
            if (values.activityStartDate) formData.append("activityStartDate", values.activityStartDate)
            if (values.note) formData.append("note", values.note)
            if (values.requestId) formData.append("requestId", values.requestId)

            onSubmit(formData, "existing-user")
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8" dir="rtl">
            <div className="space-y-8">
                {/* Creation Mode Selector (Only when creating a new file) */}
                {!isEdit && (
                    <div className="bg-card p-4 rounded-2xl border shadow-sm flex flex-col sm:flex-row gap-3">
                        <Button
                            type="button"
                            variant={creationMode === "with-user" ? "default" : "outline"}
                            onClick={() => setCreationMode("with-user")}
                            className={`flex-1 h-13 rounded-xl gap-2 font-bold transition-all ${
                                creationMode === "with-user"
                                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md"
                                    : "bg-muted/30 hover:bg-muted"
                            }`}
                        >
                            <UserPlus className="size-5" />
                            <span>مكلف جديد (إنشاء مستخدم وفتح ملف)</span>
                        </Button>

                        <Button
                            type="button"
                            variant={creationMode === "existing-user" ? "default" : "outline"}
                            onClick={() => setCreationMode("existing-user")}
                            className={`flex-1 h-13 rounded-xl gap-2 font-bold transition-all ${
                                creationMode === "existing-user"
                                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md"
                                    : "bg-muted/30 hover:bg-muted"
                            }`}
                        >
                            <UserCheck className="size-5" />
                            <span>مكلف مسجل مسبقاً (ربط بمستخدم موجود)</span>
                        </Button>
                    </div>
                )}

                {/* Edit Mode Owner Info Badge */}
                {isEdit && initialData?.user && (
                    <Card className="p-6 rounded-2xl border shadow-sm bg-primary/5 border-primary/20">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                                <UserIcon className="size-6" />
                            </div>
                            <div className="space-y-1 text-right">
                                <span className="text-xs text-muted-foreground font-semibold">صاحب الملف (المكلف)</span>
                                <h3 className="text-lg font-bold">
                                    {initialData.user.firstName} {initialData.user.lastName}
                                    {initialData.user.userName && ` (@${initialData.user.userName})`}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    الهاتف: {initialData.user.phone || "—"} | القسم: {initialData.department?.name || "—"}
                                </p>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Section 1: User Info (Only if creationMode === "with-user") */}
                {!isEdit && creationMode === "with-user" && (
                    <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">1</span>
                            <h2 className="text-xl font-bold">بيانات المكلف (المستخدم الجديد)</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium leading-none mb-2 block">
                                    الاسم الأول *
                                </label>
                                <Input placeholder="الاسم الأول" {...register("firstName")} className="h-12 bg-muted/30 rounded-xl" />
                                {errors.firstName?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.firstName.message)}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium leading-none mb-2 block">
                                    اسم العائلة *
                                </label>
                                <Input placeholder="اسم العائلة" {...register("lastName")} className="h-12 bg-muted/30 rounded-xl" />
                                {errors.lastName?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.lastName.message)}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium leading-none mb-2 block">
                                    رقم الهاتف (9 أرقام تبدأ بـ 7) *
                                </label>
                                <Input placeholder="7XXXXXXXX" {...register("phone")} className="h-12 bg-muted/30 rounded-xl text-left" dir="ltr" />
                                {errors.phone?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.phone.message)}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium leading-none mb-2 block">
                                    قسم المستخدم *
                                </label>
                                {isAdmin ? (
                                    <AdminDepartmentSelect setValue={setValue} watch={watch} error={errors.departmentID?.message ? String(errors.departmentID.message) : undefined} fieldName="departmentID" />
                                ) : (
                                    <Input value={user?.departmentName || ""} readOnly className="h-12 bg-muted/30 rounded-xl" />
                                )}
                            </div>

                            {/* User Files: ID Card (PDF) & Image */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium block">
                                    ملف البطاقة الشخصية (PDF) *
                                </label>
                                <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/5 h-[110px]">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
                                        {idCardName ? <Check size={16} /> : <Upload size={16} />}
                                    </div>
                                    <span className="text-xs text-muted-foreground truncate max-w-full px-2">
                                        {idCardName || "انقر لرفع البطاقة الشخصية (PDF)"}
                                    </span>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => handleFileChange(e, "idCard", setIdCardName)}
                                    />
                                </div>
                                {errors.idCard?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.idCard.message)}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium block">
                                    الصورة الشخصية *
                                </label>
                                <div className="relative border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/5 h-[110px]">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="h-14 w-14 rounded-full object-cover mb-1 border" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
                                            <Upload size={16} />
                                        </div>
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                        {imagePreview ? "تغيير الصورة" : "انقر لرفع صورة شخصية"}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => handleFileChange(e, "image")}
                                    />
                                </div>
                                {errors.image?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.image.message)}</p>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Section 1 (Alt): Select Existing User */}
                {!isEdit && creationMode === "existing-user" && (
                    <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">1</span>
                            <h2 className="text-xl font-bold">اختيار المكلف المسجل</h2>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none mb-2 block">
                                المكلف (المستخدم) *
                            </label>
                            <UserSearchSelect
                                value={watch("userId") ? Number(watch("userId")) : undefined}
                                onSelect={(id) => setValue("userId", id.toString(), { shouldValidate: true })}
                                disabled={isLoading || Boolean(initialUserId)}
                            />
                            {errors.userId?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.userId.message)}</p>}
                        </div>
                    </div>
                )}

                {/* Section 2: File Details */}
                <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                            {isEdit ? "1" : "2"}
                        </span>
                        <h2 className="text-xl font-bold">بيانات الملف الضريبي</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                رقم الحصر *
                            </label>
                            <Input placeholder="رقم الحصر" {...register("inventoryNumber")} className="h-12 bg-muted/30 rounded-xl" />
                            {errors.inventoryNumber?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.inventoryNumber.message)}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                رقم الملف الضريبي
                            </label>
                            <Input placeholder="الرقم الضريبي (اختياري)" {...register("taxNumber")} className="h-12 bg-muted/30 rounded-xl" />
                            {errors.taxNumber?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.taxNumber.message)}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                عدد المستندات *
                            </label>
                            <Input type="number" placeholder="عدد المستندات" {...register("docsCount")} className="h-12 bg-muted/30 rounded-xl" />
                            {errors.docsCount?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.docsCount.message)}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                قسم الملف *
                            </label>
                            {isAdmin ? (
                                <AdminDepartmentSelect setValue={setValue} watch={watch} error={errors.departmentId?.message ? String(errors.departmentId.message) : undefined} fieldName="departmentId" />
                            ) : (
                                <Input value={user?.departmentName || ""} readOnly className="h-12 bg-muted/30 rounded-xl" />
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                حالة الملف *
                            </label>
                            <div className="h-12 w-full">
                                <Select onValueChange={(v) => setValue("fileStatusId", v, { shouldValidate: true })} value={watch("fileStatusId")} disabled={isLoadingFileStatuses}>
                                    <SelectTrigger style={{ height: "100%" }} className="w-full h-full bg-muted/30 rounded-xl">
                                        {isLoadingFileStatuses ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                                <span className="text-muted-foreground">جاري التحميل...</span>
                                            </div>
                                        ) : (
                                            <SelectValue placeholder="اختر حالة الملف" />
                                        )}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fileStatuses?.data?.map((status: FileStatus) => (
                                            <SelectItem key={status.id} value={status.id.toString()}>
                                                {status.statusName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {errors.fileStatusId?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.fileStatusId.message)}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                نوع النشاط *
                            </label>
                            <div className="h-12 w-full">
                                <Select onValueChange={(v) => setValue("activityTypeId", v, { shouldValidate: true })} value={watch("activityTypeId")} disabled={isLoadingActivityTypes}>
                                    <SelectTrigger style={{ height: "100%" }} className="w-full h-full bg-muted/30 rounded-xl">
                                        {isLoadingActivityTypes ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                                <span className="text-muted-foreground">جاري التحميل...</span>
                                            </div>
                                        ) : (
                                            <SelectValue placeholder="اختر نوع النشاط" />
                                        )}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {activityTypes?.data?.map((act: ActivityType) => (
                                            <SelectItem key={act.id} value={act.id.toString()}>
                                                {act.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {errors.activityTypeId?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.activityTypeId.message)}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                نوع الدفع *
                            </label>
                            <div className="h-12 w-full">
                                <Select onValueChange={(v) => setValue("paymentTypeId", v, { shouldValidate: true })} value={watch("paymentTypeId")} disabled={isLoadingPaymentTypes}>
                                    <SelectTrigger style={{ height: "100%" }} className="w-full h-full bg-muted/30 rounded-xl">
                                        {isLoadingPaymentTypes ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                                <span className="text-muted-foreground">جاري التحميل...</span>
                                            </div>
                                        ) : (
                                            <SelectValue placeholder="اختر نوع الدفع" />
                                        )}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paymentTypes?.data?.map((pay: PaymentType) => (
                                            <SelectItem key={pay.id} value={pay.id.toString()}>
                                                {pay.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {errors.paymentTypeId?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.paymentTypeId.message)}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                تاريخ بداية النشاط
                            </label>
                            <Input type="date" {...register("activityStartDate")} className="h-12 bg-muted/30 rounded-xl text-right" dir="ltr" />
                            {errors.activityStartDate?.message && <p className="text-sm font-medium text-destructive mt-1">{String(errors.activityStartDate.message)}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium leading-none mb-2 block">
                                ملاحظات
                            </label>
                            <Input placeholder="أدخل أي ملاحظات إضافية" {...register("note")} className="h-12 bg-muted/30 rounded-xl" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl px-8 h-12 flex-1 flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 font-bold"
                    >
                        {isLoading ? (
                            <Loader2 className="size-5 animate-spin" />
                        ) : (
                            <Check className="size-5" />
                        )}
                        <span>{initialData ? "تحديث بيانات الملف" : "حفظ وفتح الملف"}</span>
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="rounded-xl px-8 h-12 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors font-bold"
                    >
                        إلغاء
                    </Button>
                </div>
            </div>
        </form>
    )
}
