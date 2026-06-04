import DashboardHeader from "@/components/layout/DahsboardHeader"
import { useFileMovement } from "../hooks/useFileMovement"
import { useParams, useNavigate } from "react-router-dom"
import { Loader2, ArrowLeft, Pencil, Archive, CalendarDays, FileSearch, Building2, UserSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/constants/routes"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import ErrorState from "@/app/pages/ErrorState"

/**
 * Page component to display detailed information about a specific file movement.
 */
const ShowFileMovement = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: fileMovement, isPending, isError } = useFileMovement(id!)
    const canUpdate = usePermission(ACTIONS.UPDATE_FILE_MOVEMENT)

    if (isError) {
        return <ErrorState />
    }

    if (isPending) {
        return (
            <div className="flex flex-col h-[400px] w-full items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">جاري جلب تفاصيل حركة الملف...</p>
            </div>
        )
    }

    const data = fileMovement?.data;

    const displayStatus = data?.status === "InsideArchive" ? "داخل الأرشيف" :
        data?.status === "OutsideArchive" ? "خارج الأرشيف" :
            data?.status === "Missing" ? "مفقود" :
                data?.status;

    // Configuration for the information grid items
    const infoItems = [
        { label: "رقم الحركة", value: data?.id, icon: Archive },
        { label: "حالة الملف", value: displayStatus, icon: Archive },
        { label: "التاريخ", value: data?.date, icon: CalendarDays },
        { label: "رقم الملف (الرقم الضريبي)", value: data?.file?.taxNumber, icon: FileSearch },
        { label: "المكلف المرتبط", value: data?.file?.taxPayer?.tradeName, icon: User },
        { label: "المأمور", value: data?.taxCollector?.fullName, icon: UserSquare },
        { label: "القسم", value: data?.department?.name, icon: Building2 },
        { label: "مدخل الحركة", value: data?.creator ? `${data.creator.firstName} ${data.creator.lastName}` : null, icon: User },
    ]

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" تفاصيل حركة الملف "
                    desc={`عرض تفاصيل حركة الملف رقم: ${data?.id}`}
                />
            </div>

            <div className=" mx-auto px-3 animate-in fade-in duration-500 space-y-6" dir="rtl">
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
                            onClick={() => navigate(ROUTES.DASHBOARD.FILE_MOVEMENTS_EDIT.replace(":id", id!))}
                            className="rounded-xl hover:bg-primary-hover cursor-pointer h-12 px-6 shadow-lg shadow-primary/20"
                        >
                            <Pencil className="ml-2 h-4 w-4" />
                            تعديل البيانات
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                    {/* Profile/Main Card */}
                    <Card className="lg:col-span-1 rounded-2xl overflow-hidden border shadow-sm ">
                        <div className="h-32 bg-primary/10 w-full" />
                        <CardContent className="px-6 pb-8 -mt-16 flex flex-col items-center text-center space-y-4">
                            <div className="w-32 h-32 rounded-full border-4 border-background bg-muted overflow-hidden shadow-lg">
                                <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                                    <Archive size={64} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold">حركة رقم {data?.id}</h2>
                                <p className="text-primary font-medium">{displayStatus}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Details Section */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {infoItems.map((item, index) => (
                            <Card key={index} className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex items-center gap-4 text-right">
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                        <item.icon size={24} />
                                    </div>
                                    <div className="space-y-1 overflow-hidden">
                                        <p className="text-sm text-muted-foreground">{item.label}</p>
                                        <p className="text-lg font-bold truncate">
                                            {item.value || "غير متوفر"}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowFileMovement
