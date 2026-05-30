import { useEffect } from "react"
import { useForm, type UseFormSetValue, type UseFormWatch } from "react-hook-form"
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
import { Loader2, Save, FileSearch, UserSquare, Building2, CalendarDays, Archive, FolderOpen, AlertCircle } from "lucide-react"
import type { FileMovement } from "@/types/FileMovments"
import { useDepartments } from "@/features/basic-info/hooks/departments/useDepartments"
import { FileSearchSelect } from "@/features/files/components/FileSearchSelect"
import { useTaxCollectors } from "@/features/tax-collectors/hooks/tax-collectors/useTaxCollectors"
import { useAuth } from "@/hooks/useAuth"
import { ROLES } from "@/constants/roles"

const fileMovementSchema = z.object({
    status: z.string().min(1, "يرجى اختيار حالة الملف"),
    date: z.string().min(1, "يرجى إدخال التاريخ"),
    fileId: z.string().min(1, "يرجى اختيار الملف"),
    taxCollectorId: z.string().min(1, "يرجى اختيار المحصل"),
    departmentId: z.string().min(1, "يرجى اختيار القسم"),
})

type FileMovementFormValues = z.infer<typeof fileMovementSchema>

interface FileMovementFormProps {
    initialData?: FileMovement | null
    onSubmit: (data: FormData) => void
    isLoading?: boolean
}
interface AdminDepartmentSelectProps {
    setValue: UseFormSetValue<FileMovementFormValues>,
    watch: UseFormWatch<FileMovementFormValues>,
    error?: string,
}
const AdminDepartmentSelect = ({ setValue, watch, error, }: AdminDepartmentSelectProps) => {
    const { data: departments, isPending: isLoadingDepts } = useDepartments()

    return (
        <>
            <div className="h-12 w-full">
                <Select
                    onValueChange={(val) => setValue("departmentId", val)}
                    value={watch("departmentId")}
                    key={watch("departmentId")}
                    disabled={isLoadingDepts}
                >
                    <SelectTrigger style={{ height: "100%" }} className="w-full h-full bg-muted/30">
                        {isLoadingDepts ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                <span className="text-muted-foreground">جاري التحميل...</span>
                            </div>
                        ) : (
                            <SelectValue placeholder="إختر القسم" />
                        )}
                    </SelectTrigger>
                    <SelectContent>
                        {departments?.data?.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id.toString()}>
                                {dept.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {error && <p className="text-sm font-medium text-destructive mt-1">{error}</p>}
        </>
    )
}

export const FileMovementForm = ({ initialData, onSubmit, isLoading }: FileMovementFormProps) => {
    const { user } = useAuth()
    const isAdmin = user?.role === ROLES.ADMIN
    const { data: taxCollectors, isPending: isLoadingCollectors } = useTaxCollectors()

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FileMovementFormValues>({
        resolver: zodResolver(fileMovementSchema),
        defaultValues: {
            status: initialData?.status || "InsideArchive",
            date: initialData?.date || new Date().toISOString().split('T')[0],
            fileId: initialData?.file?.id?.toString() || "",
            taxCollectorId: initialData?.taxCollector?.id?.toString() || "",
            departmentId: initialData?.department?.id?.toString() || "",
        }
    })

    // Watch for initialData changes
    useEffect(() => {
        if (!isAdmin && user?.departmentID) setValue("departmentId", user.departmentID.toString())

        if (initialData?.status) setValue("status", initialData.status)
        if (initialData?.date) setValue("date", initialData.date)
        if (initialData?.file?.id) setValue("fileId", initialData.file.id.toString())
        if (initialData?.taxCollector?.id) setValue("taxCollectorId", initialData.taxCollector.id.toString())
        if (isAdmin && initialData?.department?.id) setValue("departmentId", initialData.department.id.toString())
    }, [initialData, isAdmin, setValue, user?.departmentID])

    const handleFormSubmit = (values: FileMovementFormValues) => {
        const formData = new FormData()

        formData.append("status", values.status)
        formData.append("date", values.date)
        formData.append("fileId", values.fileId)

        formData.append("taxCollectorId", values.taxCollectorId)
        formData.append("departmentId", values.departmentId)

        onSubmit(formData)
    }

    const statuses = [
        { id: "InsideArchive", label: "داخل الأرشيف", icon: Archive },
        { id: "OutsideArchive", label: "خارج الأرشيف", icon: FolderOpen },
        { id: "Missing", label: "مفقود", icon: AlertCircle },
    ]

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8" dir="rtl">
            <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold"><Archive size={18} /></span>
                    <h2 className="text-xl font-bold">تفاصيل حركة الملف</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* File Selection */}
                    <div>
                        <label className="text-sm font-medium leading-none mb-2 block flex items-center gap-2">
                            <FileSearch size={16} className="text-muted-foreground" />
                            الملف *
                        </label>
                        <div className="h-12 w-full">
                            <FileSearchSelect
                                value={watch("fileId") ? Number(watch("fileId")) : undefined}
                                onSelect={(id) => setValue("fileId", id.toString(), { shouldValidate: true })}
                            />
                        </div>
                        {errors.fileId && <p className="text-sm font-medium text-destructive mt-1">{errors.fileId.message}</p>}
                    </div>

                    {/* Status Selection */}
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4 block flex items-center gap-2">
                            <Archive size={16} className="text-muted-foreground" />
                            حالة الملف *
                        </label>
                        <div className="grid grid-cols-3 pb-2 gap-4">
                            {statuses.map((status) => (
                                <div
                                    key={status.id}
                                    onClick={() => setValue("status", status.id as string)}
                                    className={`
                                    cursor-pointer p-2 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all
                                    ${watch("status") === status.id
                                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                                            : "border-muted bg-background hover:bg-muted/30"}
                                `}
                                >
                                    <div className={`p-2 rounded-lg ${watch("status") === status.id ? "bg-primary/30" : "bg-muted"}`}>
                                        <status.icon className="size-4 xl:size-5.5" />
                                    </div>
                                    <span className="text-xs font-semibold">{status.label}</span>
                                </div>
                            ))}
                        </div>
                        {errors.status && <p className="text-sm font-medium text-destructive mt-1">{errors.status.message}</p>}
                    </div>

                    {/* Date Selection */}
                    <div>
                        <label className="text-sm font-medium leading-none mb-2 block flex items-center gap-2">
                            <CalendarDays size={16} className="text-muted-foreground" />
                            التاريخ *
                        </label>
                        <Input type="date" {...register("date")} className="h-12 bg-muted/30" />
                        {errors.date && <p className="text-sm font-medium text-destructive mt-1">{errors.date.message}</p>}
                    </div>

                    {/* Tax Collector Selection */}
                    <div>
                        <label className="text-sm font-medium leading-none mb-2 block flex items-center gap-2">
                            <UserSquare size={16} className="text-muted-foreground" />
                            المحصل *
                        </label>
                        <div className="h-12 w-full">
                            <Select
                                onValueChange={(val) => setValue("taxCollectorId", val)}
                                value={watch("taxCollectorId")}
                                key={watch("taxCollectorId")}
                                disabled={isLoadingCollectors}
                            >
                                <SelectTrigger style={{ height: "100%" }} className="w-full h-full bg-muted/30">
                                    {isLoadingCollectors ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                            <span className="text-muted-foreground">جاري التحميل...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="إختر المحصل" />
                                    )}
                                </SelectTrigger>
                                <SelectContent>
                                    {taxCollectors?.data?.map((collector) => (
                                        <SelectItem key={collector.id} value={collector.id.toString()}>
                                            {collector.fullName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.taxCollectorId && <p className="text-sm font-medium text-destructive mt-1">{errors.taxCollectorId.message}</p>}
                    </div>

                    {/* Department Selection */}
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium leading-none mb-2 block flex items-center gap-2">
                            <Building2 size={16} className="text-muted-foreground" />
                            القسم *
                        </label>
                        {isAdmin ? (
                            <AdminDepartmentSelect setValue={setValue} watch={watch} error={errors.departmentId?.message} />
                        ) : (
                            <Input value={user?.departmentName || ""} readOnly className="h-12 bg-muted/30" />
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                    type="submit"
                    size="lg"
                    className="h-12 lg:h-14 text-sm md:text-lg hover:bg-primary-hover cursor-pointer font-bold rounded-xl shadow-lg shadow-primary/20"
                    disabled={isLoading}
                >
                    <div className="flex items-center justify-center gap-2">
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Save className="h-5 w-5" />
                        )}
                        <span>
                            {isLoading ? "جاري الحفظ..." : (initialData ? "تحديث بيانات حركة الملف" : "حفظ بيانات حركة الملف")}
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
