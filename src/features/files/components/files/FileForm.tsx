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
} from "lucide-react"
import type { File } from "@/types/File"

import { AdminDepartmentSelect } from "@/features/basic-info/components/departments/AdminDepartmentSelect"
import { TaxPayerSearchSelect } from "@/features/tax-payers/components/tax-payers/TaxPayerSearchSelect"
import { useFileStatuses } from "@/features/basic-info/hooks/file-status/useFileStatuses"
import { useActivityTypes } from "@/features/basic-info/hooks/activity-types/useActivityTypes"
import { usePaymentTypes } from "@/features/basic-info/hooks/payment-types/usePaymentTypes"
import { useRegions } from "@/features/basic-info/hooks/regions/useRegions"
// import { useDistricts } from "@/features/basic-info/hooks/districts/useDistricts"
import type { FileStatus } from "@/types/FileStatus"
import type { ActivityType, District, PaymentType, Region } from "@/types"
import { useAuth } from "@/hooks/useAuth"
import { ROLES } from "@/constants/roles"
import { useDistrictsByRegion } from "@/features/basic-info/hooks/districts/useDistrictsByRegion"

const fileSchema = z.object({
    taxNumber: z.string().min(1, "رقم المكلف الضريبي مطلوب"),
    inventoryNumber: z.string().min(1, "رقم الحصر مطلوب"),
    docsCount: z.string().min(1, "عدد المستندات مطلوب"),
    taxPayerId: z.string().min(1, "يرجى اختيار المكلف"),
    departmentId: z.string().min(1, "يرجى اختيار القسم"),
    fileStatusId: z.string().min(1, "يرجى اختيار حالة الملف"),
    activityTypeId: z.string().min(1, "يرجى اختيار نوع النشاط"),
    paymentTypeId: z.string().min(1, "يرجى اختيار نوع الدفع"),
    regionId: z.string().min(1, "يرجى اختيار المنطقة"),
    districtId: z.string().min(1, "يرجى اختيار الحي"),
    activityStartDate: z.string().min(1, "تاريخ بداية النشاط مطلوب"),
    note: z.string().optional(),
})

type FileFormValues = z.infer<typeof fileSchema>

interface FileFormProps {
    initialData?: File['fileInfo'] | null
    onSubmit: (data: FormData) => void
    isLoading?: boolean
}
export const FileForm = ({ initialData, onSubmit, isLoading }: FileFormProps) => {
    const { user } = useAuth()
    const isAdmin = user?.role === ROLES.ADMIN

    const { data: fileStatuses, isPending: isLoadingFileStatuses } = useFileStatuses()
    const { data: activityTypes, isPending: isLoadingActivityTypes } = useActivityTypes()
    const { data: paymentTypes, isPending: isLoadingPaymentTypes } = usePaymentTypes()
    const [regionId, setRegionId] = useState<string | number | null>(0)
    const { data: regions, isPending: isLoadingRegions } = useRegions()
    const { data: districts, isPending: isLoadingDistricts } = useDistrictsByRegion(regionId!)
    // const { data: districts, isPending: isLoadingDistricts } = useDistricts()

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FileFormValues>({
        resolver: zodResolver(fileSchema),
        defaultValues: {
            taxNumber: initialData?.taxNumber?.toString() || "",
            inventoryNumber: initialData?.inventoryNumber?.toString() || "",
            docsCount: initialData?.docsCount?.toString() || "",
            taxPayerId: initialData?.taxPayer?.id?.toString() || "",
            departmentId: initialData?.department?.id?.toString() || "",
            fileStatusId: initialData?.fileStatus?.id?.toString() || "",
            activityTypeId: initialData?.activityType?.id?.toString() || "",
            paymentTypeId: initialData?.paymentType?.id?.toString() || "",
            regionId: initialData?.region?.id?.toString() || "",
            districtId: initialData?.district?.id?.toString() || "",
            activityStartDate: initialData?.activityStartDate || "",
            note: initialData?.note || "",
        }
    })

    useEffect(() => {
        if (!isAdmin && user?.departmentID) {
            setValue("departmentId", user.departmentID.toString())
        }

        if (initialData) {
            setValue("taxNumber", initialData.taxNumber?.toString() || "")
            setValue("inventoryNumber", initialData.inventoryNumber?.toString() || "")
            setValue("docsCount", initialData.docsCount?.toString() || "")
            setValue("taxPayerId", initialData.taxPayer?.id?.toString() || "")
            if (isAdmin) setValue("departmentId", initialData.department?.id?.toString() || "")
            setValue("fileStatusId", initialData.fileStatus?.id?.toString() || "")
            setValue("activityTypeId", initialData.activityType?.id?.toString() || "")
            setValue("paymentTypeId", initialData.paymentType?.id?.toString() || "")
            setValue("regionId", initialData.region?.id?.toString() || "")
            setValue("districtId", initialData.district?.id?.toString() || "")
            setValue("activityStartDate", initialData.activityStartDate || "")
            setValue("note", initialData.note || "")
            setRegionId(initialData.region?.id || null)
        }
    }, [initialData, isAdmin, setValue, user?.departmentID])

    const handleFormSubmit = (values: FileFormValues) => {
        const formData = new FormData()
        if (initialData) {
            if (initialData.inventoryNumber !== values.inventoryNumber) {
                formData.append("inventoryNumber", values.inventoryNumber)
            }
        }
        else {
            formData.append("inventoryNumber", values.inventoryNumber)
        }
        const commonFields = ["taxNumber", "docsCount", "taxPayerId", "departmentId", "fileStatusId", "activityTypeId", "paymentTypeId", "regionId", "districtId", "activityStartDate", "note"]

        commonFields.forEach(fieldName => {
            const value = values[fieldName as keyof FileFormValues]
            if (value !== undefined && value !== null && value !== "") {
                formData.append(fieldName, value as string)
            }
        })
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8" dir="rtl">
            <div className="space-y-8">
                {/* Section 1: Basic Info */}
                <div className="bg-card p-6 pb-2 rounded-2xl border shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">1</span>
                        <h2 className="text-xl font-bold">البيانات الأساسية للملف</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                المكلف *
                            </label>
                            <TaxPayerSearchSelect
                                value={watch("taxPayerId") ? Number(watch("taxPayerId")) : undefined}
                                onSelect={(id) => setValue("taxPayerId", id.toString(), { shouldValidate: true })}
                                disabled={isLoading}
                            />
                            {errors.taxPayerId && <p className="text-sm font-medium text-destructive mt-1">{errors.taxPayerId.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                القسم *
                            </label>
                            {isAdmin ? (
                                <AdminDepartmentSelect setValue={setValue} watch={watch} error={errors.departmentId?.message} fieldName="departmentId" />
                            ) : (
                                <Input value={user?.departmentName || ""} readOnly className="h-12 bg-muted/30" />
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                حالة الملف *
                            </label>
                            <Select onValueChange={(v) => setValue("fileStatusId", v)} value={watch("fileStatusId")} disabled={isLoadingFileStatuses}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-muted-foreground/10">
                                    {isLoadingFileStatuses ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                            <span className="text-muted-foreground">جاري التحميل...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="اختر حالة الملف" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {fileStatuses?.data?.map((status: FileStatus) => (
                                        <SelectItem key={status.id} value={status.id.toString()}>
                                            {status.statusName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.fileStatusId && <p className="text-sm font-medium text-destructive mt-1">{errors.fileStatusId.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                نوع النشاط *
                            </label>
                            <Select onValueChange={(v) => setValue("activityTypeId", v)} value={watch("activityTypeId")} disabled={isLoadingActivityTypes}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-muted-foreground/10">
                                    {isLoadingActivityTypes ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                            <span className="text-muted-foreground">جاري التحميل...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="اختر نوع النشاط" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {activityTypes?.data?.map((act: ActivityType) => (
                                        <SelectItem key={act.id} value={act.id.toString()}>
                                            {act.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.activityTypeId && <p className="text-sm font-medium text-destructive mt-1">{errors.activityTypeId.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                نوع الدفع *
                            </label>
                            <Select onValueChange={(v) => setValue("paymentTypeId", v)} value={watch("paymentTypeId")} disabled={isLoadingPaymentTypes}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-muted-foreground/10">
                                    {isLoadingPaymentTypes ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                            <span className="text-muted-foreground">جاري التحميل...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="اختر نوع الدفع" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {paymentTypes?.data?.map((pay: PaymentType) => (
                                        <SelectItem key={pay.id} value={pay.id.toString()}>
                                            {pay.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.paymentTypeId && <p className="text-sm font-medium text-destructive mt-1">{errors.paymentTypeId.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                المنطقة *
                            </label>
                            <Select
                                onValueChange={(v) => {
                                    setValue("regionId", v)
                                    setRegionId(v)
                                }}
                                value={watch("regionId")} disabled={isLoadingRegions}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-muted-foreground/10">
                                    {isLoadingRegions ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                            <span className="text-muted-foreground">جاري التحميل...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="اختر المنطقة" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {regions?.data?.map((region: Region) => (
                                        <SelectItem key={region.id} value={region.id.toString()}>
                                            {region.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.regionId && <p className="text-sm font-medium text-destructive mt-1">{errors.regionId.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                الحي *
                            </label>
                            <Select onValueChange={(v) => setValue("districtId", v)} value={watch("districtId")} disabled={isLoadingDistricts}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-muted-foreground/10">
                                    {isLoadingDistricts ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                            <span className="text-muted-foreground">جاري التحميل...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="اختر الحي" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {districts?.data?.map((district: District) => (
                                        <SelectItem key={district.id} value={district.id.toString()}>
                                            {district.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.districtId && <p className="text-sm font-medium text-destructive mt-1">{errors.districtId.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Section 2: Related Data */}

                <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">2</span>
                        <h2 className="text-xl font-bold">تفاصيل الملف</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                رقم المكلف الضريبي *
                            </label>
                            <Input placeholder="رقم المكلف الضريبي" {...register("taxNumber")} className="h-12 bg-muted/30" />
                            {errors.taxNumber && <p className="text-sm font-medium text-destructive mt-1">{errors.taxNumber.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                رقم الحصر *
                            </label>
                            <Input placeholder="رقم الحصر" {...register("inventoryNumber")} className="h-12 bg-muted/30" />
                            {errors.inventoryNumber && <p className="text-sm font-medium text-destructive mt-1">{errors.inventoryNumber.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                عدد المستندات *
                            </label>
                            <Input type="number" placeholder="عدد المستندات" {...register("docsCount")} className="h-12 bg-muted/30" />
                            {errors.docsCount && <p className="text-sm font-medium text-destructive mt-1">{errors.docsCount.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium leading-none mb-2 block">
                                تاريخ بداية النشاط *
                            </label>
                            <Input type="date" {...register("activityStartDate")} className="h-12 bg-muted/30 text-right" dir="ltr" />
                            {errors.activityStartDate && <p className="text-sm font-medium text-destructive mt-1">{errors.activityStartDate.message}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium leading-none mb-2 block">
                                ملاحظات
                            </label>
                            <Input placeholder="أدخل أي ملاحظات إضافية" {...register("note")} className="h-12 bg-muted/30" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#911111] hover:bg-[#7a0e0e] text-white rounded-xl px-8 h-12 flex-1 flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 font-bold"
                    >
                        {isLoading ? (
                            <Loader2 className="size-5 animate-spin" />
                        ) : (
                            <Check className="size-5" />
                        )}
                        <span>{initialData ? "تحديث بيانات الملف" : "حفظ بيانات الملف"}</span>
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="rounded-xl px-8 h-12 border-none bg-gray-100 dark:bg-muted text-muted-foreground hover:bg-gray-200 dark:hover:bg-muted/80 transition-colors font-bold"
                    >
                        إلغاء
                    </Button>
                </div>
            </div>
        </form>
    )
}
