import { useFile } from "../../hooks/files/useFile"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
    Loader2,
    ArrowLeft,
    Pencil,
    FileText,
    Hash,
    Building2,
    Calendar,
    Clock,
    Receipt,
    BarChart,
    User as UserIcon,
    Phone,
    CreditCard,
    Plus,
    ExternalLink,
    Briefcase,
    BadgePercent,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ROUTES } from "@/constants/routes"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import ErrorState from "@/app/pages/ErrorState"
import type { TaxPayerActivity } from "@/types/File"

/**
 * Page component to display comprehensive details about a specific file:
 * - File Archive Information
 * - User / Taxpayer Owner Information
 * - Tax Information
 * - Taxpayer Activities List
 */
const ViewFilePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: fileResponse, isPending, isError } = useFile(id!)
    const canUpdate = usePermission(ACTIONS.UPDATE_FILE)
    const canCreateActivity = usePermission(ACTIONS.CREATE_TAX_PAYER)

    const file = fileResponse?.data

    if (isError) {
        return <ErrorState />
    }

    if (isPending) {
        return (
            <div className="flex flex-col h-[400px] w-full items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">جاري جلب تفاصيل الملف...</p>
            </div>
        )
    }

    const fileInfoItems = [
        { label: "رقم الحصر", value: file?.inventoryNumber, icon: Hash },
        { label: "الرقم الضريبي", value: file?.taxNumber, icon: Hash },
        { label: "عدد المستندات", value: file?.docsCount, icon: FileText },
        { label: "حالة الملف", value: file?.fileStatus?.statusName, icon: Clock },
        { label: "نوع النشاط", value: file?.activityType?.name, icon: BarChart },
        { label: "نوع الدفع", value: file?.paymentType?.name, icon: Receipt },
        { label: "القسم", value: file?.department?.name, icon: Building2 },
        { label: "تاريخ بداية النشاط", value: file?.activityStartDate, icon: Calendar },
        { label: "ملاحظات", value: file?.note, icon: FileText },
    ]

    const activities: TaxPayerActivity[] = file?.taxPayers || []
    const taxInfo = file?.taxInformation

    return (
        <div className="container mx-auto px-3 animate-in fade-in duration-500 space-y-8 pb-12" dir="rtl">
            {/* Header Actions */}
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        ملف رقم: {file?.inventoryNumber || file?.taxNumber || file?.id}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        صاحب الملف: {file?.user ? `${file.user.firstName} ${file.user.lastName}` : "—"}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => navigate(-1)}
                        className="rounded-xl hover:bg-accent cursor-pointer h-11 px-5"
                    >
                        <ArrowLeft className="ml-2 h-4 w-4" />
                        رجوع
                    </Button>
                    {canUpdate && (
                        <Button
                            onClick={() => navigate(ROUTES.DASHBOARD.FILES_EDIT.replace(":id", id!))}
                            className="rounded-xl hover:bg-primary-hover cursor-pointer h-11 px-5 shadow-lg shadow-primary/20"
                        >
                            <Pencil className="ml-2 h-4 w-4" />
                            تعديل بيانات الملف
                        </Button>
                    )}
                </div>
            </div>

            {/* Section 1: User / Taxpayer Information */}
            {file?.user && (
                <Card className="rounded-3xl border shadow-sm overflow-hidden bg-card">
                    <CardHeader className="bg-muted/30 border-b pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                <UserIcon className="size-5" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold">بيانات المكلف (صاحب الملف)</CardTitle>
                                <p className="text-xs text-muted-foreground">المستخدم المرتبط بهذا الملف الضريبي</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                                    <UserIcon className="size-5 text-muted-foreground" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs text-muted-foreground">الاسم الكامل</p>
                                    <p className="font-bold text-sm">{file.user.firstName} {file.user.lastName}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                                    <UserIcon className="size-5 text-muted-foreground" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs text-muted-foreground">اسم المستخدم</p>
                                    <p className="font-bold text-sm">{file.user.userName ? `@${file.user.userName}` : "—"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                                    <Phone className="size-5 text-muted-foreground" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs text-muted-foreground">رقم الهاتف</p>
                                    <p className="font-bold text-sm text-left" dir="ltr">{file.user.phone || "—"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                                    <CreditCard className="size-5 text-muted-foreground" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs text-muted-foreground">البطاقة الشخصية</p>
                                    {file.user.idCard ? (
                                        <a
                                            href={file.user.idCard}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                        >
                                            <span>عرض الملف</span>
                                            <ExternalLink className="size-3" />
                                        </a>
                                    ) : (
                                        <p className="text-sm font-bold">—</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Section 2: File Basic Details */}
            <Card className="rounded-3xl border shadow-sm overflow-hidden bg-card">
                <CardHeader className="bg-muted/30 border-b pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                            <FileText className="size-5" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold">بيانات الملف الأرشيفي</CardTitle>
                            <p className="text-xs text-muted-foreground">البيانات الفنية والإدارية للملف</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {fileInfoItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-muted/50">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <item.icon size={20} />
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                    <p className="text-xs text-muted-foreground">{item.label}</p>
                                    <p className="text-sm font-bold truncate">
                                        {item.value || "غير متوفر"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Section 3: Tax Information (If available) */}
            {taxInfo && (
                <Card className="rounded-3xl border shadow-sm overflow-hidden bg-card">
                    <CardHeader className="bg-muted/30 border-b pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                                <BadgePercent className="size-5" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold">البيانات الضريبية</CardTitle>
                                <p className="text-xs text-muted-foreground">تفاصيل ضريبة الملف</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 rounded-2xl bg-muted/20 border space-y-1">
                                <p className="text-xs text-muted-foreground">نوع الضريبة</p>
                                <p className="text-sm font-bold">{taxInfo.taxType?.name || "—"}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/20 border space-y-1">
                                <p className="text-xs text-muted-foreground">مبلغ الضريبة</p>
                                <p className="text-sm font-bold text-destructive">{taxInfo.taxAmount} ريال</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/20 border space-y-1">
                                <p className="text-xs text-muted-foreground">آخر دفعة</p>
                                <p className="text-sm font-bold text-emerald-600">{taxInfo.lastPayment} ريال</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Section 4: Taxpayer Activities */}
            <Card className="rounded-3xl border shadow-sm overflow-hidden bg-card">
                <CardHeader className="bg-muted/30 border-b pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                <Briefcase className="size-5" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold">أنشطة المكلف (Taxpayer Activities)</CardTitle>
                                <p className="text-xs text-muted-foreground">
                                    الأنشطة التجارية والتراخيص المسجلة تحت هذا الملف ({activities.length})
                                </p>
                            </div>
                        </div>

                        {canCreateActivity && (
                            <Link to={`${ROUTES.DASHBOARD.TAXPAYERS.PAYERS.CREATE}?fileId=${file?.id}`}>
                                <Button size="sm" className="rounded-xl gap-2 font-bold bg-primary hover:bg-primary-hover">
                                    <Plus className="size-4" />
                                    <span>إضافة نشاط للملف</span>
                                </Button>
                            </Link>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {activities.length === 0 ? (
                        <div className="text-center py-10 space-y-3">
                            <p className="text-sm text-muted-foreground">لا توجد أنشطة مسجلة لهذا الملف حالياً.</p>
                            {canCreateActivity && (
                                <Link to={`${ROUTES.DASHBOARD.TAXPAYERS.PAYERS.CREATE}?fileId=${file?.id}`}>
                                    <Button variant="outline" className="rounded-xl gap-2">
                                        <Plus className="size-4" />
                                        <span>إضافة أول نشاط</span>
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="p-5 rounded-2xl border border-border bg-muted/10 hover:bg-muted/20 transition-all space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-base text-foreground">{activity.tradeName}</h4>
                                        <Badge variant="outline" className="rounded-xl px-3 py-1 text-xs">
                                            {activity.fileType === "Individual"
                                                ? "فرد"
                                                : activity.fileType === "Company"
                                                    ? "شركة"
                                                    : "شركة خيرية"}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                        {activity.region && <div>المنطقة: <span className="font-semibold text-foreground">{activity.region.name}</span></div>}
                                        {activity.district && <div>الحي: <span className="font-semibold text-foreground">{activity.district.name}</span></div>}
                                    </div>

                                    <div className="flex items-center gap-3 pt-2 border-t text-xs">
                                        {activity.commercialRecord && (
                                            <a href={activity.commercialRecord} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                                                <span>السجل التجاري</span>
                                                <ExternalLink className="size-3" />
                                            </a>
                                        )}
                                        {activity.activityLicense && (
                                            <a href={activity.activityLicense} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                                                <span>ترخيص النشاط</span>
                                                <ExternalLink className="size-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default ViewFilePage