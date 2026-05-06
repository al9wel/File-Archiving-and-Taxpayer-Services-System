import { useIndividualTaxPayer } from "../../../hooks/tax-payers/individual/useIndividualTaxPayer"
import { useParams, useNavigate } from "react-router-dom"
import { Loader2, User as UserIcon, Phone, Shield, Briefcase, ArrowLeft, Pencil, FileText, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/constants/routes"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import ErrorState from "@/app/pages/ErrorState"

const ViewTaxPayerPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: payer, isLoading, isError } = useIndividualTaxPayer(id!)
    const canUpdate = usePermission(ACTIONS.UPDATE_TAX_PAYER)

    if (isError) return <ErrorState />

    if (isLoading) {
        return (
            <div className="flex flex-col h-[400px] w-full items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">جاري جلب تفاصيل المكلف...</p>
            </div>
        )
    }

    const data = payer?.data;

    const infoItems = [
        { label: "رقم المكلف", value: data?.taxPayer.id, icon: Shield },
        { label: "رقم المستخدم", value: data?.userInfo.id, icon: Hash },
        { label: "رقم الهاتف", value: data?.userInfo.phone, icon: Phone },
        { label: "الدور", value: "مكلف", icon: Briefcase },
        { label: "القسم", value: data?.userInfo.department?.name, icon: Briefcase },
        { label: "نوع الملف", value: data?.taxPayer.fileType === "Individual" ? "فرد" : data?.taxPayer.fileType === "Company" ? "شركة" : "جمعية خيرية", icon: FileText },
    ]

    const documentItems = [
        { label: "نسخة بطاقة الهوية", value: data?.userInfo.idCard },
        { label: "السجل التجاري", value: data?.taxPayer.commercialRecord },
        { label: "رخصة النشاط", value: data?.taxPayer.activityLicense },
        { label: "صورة اللوحة", value: data?.taxPayer.tradePict },
        { label: "بطاقة التأمين", value: data?.taxPayer.insuranceCard },
        { label: "وثيقة الملكية", value: data?.taxPayer.propertyDocPict },
    ]

    return (
        <div className="container mx-auto animate-in fade-in duration-500 space-y-8 pt-6 pb-12" dir="rtl">
            {/* Header Actions */}
            <div className="flex justify-end gap-3">
                <Button
                    variant="secondary"
                    onClick={() => navigate(-1)}
                    className="rounded-xl hover:bg-accent cursor-pointer h-12 px-6"
                >
                    <ArrowLeft className="ml-2 h-4 w-4" /> رجوع
                </Button>
                {canUpdate && (
                    <Button
                        onClick={() => navigate(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.EDIT.replace(":id", id!))}
                        className="rounded-xl hover:bg-primary-hover cursor-pointer h-12 px-6 shadow-lg shadow-primary/20"
                    >
                        <Pencil className="ml-2 h-4 w-4" /> تعديل البيانات
                    </Button>
                )}
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Profile Card - Full Width on Top */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl overflow-hidden border shadow-sm">
                    <div className="h-40 bg-primary/10 w-full relative">
                        <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
                    </div>
                    <CardContent className="px-8 pb-8 -mt-20 relative flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="w-40 h-40 rounded-full border-8 border-background bg-muted overflow-hidden shadow-2xl shrink-0">
                            {data?.userInfo.image ? (
                                <img src={data.userInfo.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                                    <UserIcon size={80} />
                                </div>
                            )}
                        </div>
                        <div className="space-y-2 mb-4 text-center md:text-right">
                            <h2 className="text-3xl font-black text-foreground">{data?.userInfo.fullName}</h2>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">مكلف</span>
                                <span className="px-4 py-1 rounded-full bg-muted text-muted-foreground text-sm font-bold">
                                    {data?.taxPayer.fileType === "Individual" ? "فرد" : data?.taxPayer.fileType === "Company" ? "شركة" : "جمعية خيرية"}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Info Cards - Divided into 3 columns */}
                {infoItems.map((item, index) => (
                    <Card key={index} className="rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group">
                        <CardContent className="p-6 flex items-center gap-4 text-right">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                {item.icon ? <item.icon size={28} /> : <Shield size={28} />}
                            </div>
                            <div className="space-y-1 overflow-hidden">
                                <p className="text-xs text-muted-foreground font-bold">{item.label}</p>
                                <p className="text-lg font-black truncate text-foreground">
                                    {item.value || "غير متوفر"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Divider Title for Documents */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-4 flex items-center gap-4">
                    <h3 className="text-xl font-black shrink-0">الوثائق والمستندات</h3>
                    <div className="h-px bg-border w-full" />
                </div>

                {/* Document Cards - Divided into 3 columns */}
                {documentItems.map((doc, index) => (
                    <Card key={index} className="rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group">
                        <CardContent className="p-6 flex items-center gap-4 text-right">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <FileText size={28} />
                            </div>
                            <div className="space-y-1 overflow-hidden">
                                <p className="text-xs text-muted-foreground font-bold">{doc.label}</p>
                                {doc.value ? (
                                    <Button
                                        variant="link"
                                        className="p-0 h-auto font-black text-lg text-primary hover:text-primary-hover cursor-pointer"
                                        onClick={() => window.open(doc.value, '_blank')}
                                    >
                                        عرض الملف
                                    </Button>
                                ) : (
                                    <p className="text-lg font-black truncate text-muted-foreground/50 italic">غير متوفر</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ViewTaxPayerPage
