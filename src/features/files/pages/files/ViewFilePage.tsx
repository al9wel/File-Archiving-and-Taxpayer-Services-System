import { useFile } from "../../hooks/files/useFile"
import { useParams, useNavigate } from "react-router-dom"
import { Loader2, ArrowLeft, Pencil, FileText, Hash, Building2, MapPin, Calendar, Clock, Receipt, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/constants/routes"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import ErrorState from "@/app/pages/ErrorState"

/**
 * Page component to display detailed information about a specific file.
 */
const ViewFilePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: file, isPending, isError } = useFile(id!)
    const canUpdate = usePermission(ACTIONS.UPDATE_FILE)

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

    const infoItems = [
        { label: "رقم المكلف الضريبي", value: file?.data?.taxNumber, icon: Hash },
        { label: "رقم الحصر", value: file?.data?.inventoryNumber, icon: Hash },
        { label: "عدد المستندات", value: file?.data?.docsCount, icon: FileText },
        { label: "المكلف", value: file?.data?.taxPayer?.tradeName, icon: Building2 },
        { label: "القسم", value: file?.data?.department?.name, icon: Building2 },
        { label: "حالة الملف", value: file?.data?.fileStatus?.statusName, icon: Clock },
        { label: "نوع النشاط", value: file?.data?.activityType?.name, icon: BarChart },
        { label: "نوع الدفع", value: file?.data?.paymentType?.name, icon: Receipt },
        { label: "المنطقة", value: file?.data?.region?.name, icon: MapPin },
        { label: "الحي", value: file?.data?.district?.name, icon: MapPin },
        { label: "تاريخ بداية النشاط", value: file?.data?.activityStartDate, icon: Calendar },
        { label: "ملاحظات", value: file?.data?.note, icon: FileText },
    ]

    return (
        <>
            {/* <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" تفاصيل الملف "
                    desc={`عرض بيانات الملف الخاص بالمكلف: ${file?.data?.taxPayer?.tradeName || file?.data?.taxNumber}`}
                />
            </div> */}

            <div className="container mx-auto px-3 animate-in fade-in duration-500 space-y-6" dir="rtl">
                <div className="flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => navigate(-1)}
                        className="rounded-xl hover:bg-accent cursor-pointer h-12 px-6"
                    >
                        <ArrowLeft className="ml-2 h-4 w-4" />
                        رجوع
                    </Button>
                    {canUpdate && (
                        <Button
                            onClick={() => navigate(ROUTES.DASHBOARD.FILES_EDIT.replace(":id", id!))}
                            className="rounded-xl hover:bg-primary-hover cursor-pointer h-12 px-6 shadow-lg shadow-primary/20"
                        >
                            <Pencil className="ml-2 h-4 w-4" />
                            تعديل البيانات
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                    {infoItems.map((item, index) => (
                        <Card key={index} className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-center gap-4 text-right">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                    <item.icon size={24} />
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                    <p className="text-sm text-muted-foreground">{item.label}</p>
                                    <p className="text-[16px] font-bold  ">
                                        {item.value || "غير متوفر"}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ViewFilePage