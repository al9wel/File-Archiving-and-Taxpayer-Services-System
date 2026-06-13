import { useParams, useNavigate } from "react-router-dom";
import { useRequestDetails } from "../hooks/useRequestDetails";
import RequestActions from "../components/RequestActions";
import { Loader2, ArrowLeft, User as UserIcon, Phone, Briefcase, FileText, Hash, Building2, Calendar, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import Unauthorized from "@/app/pages/Unauthorized";
import ErrorState from "@/app/pages/ErrorState";

const fileTypeConfig = {
    Individual: "فردي",
    Company: "شركة",
    CharitableCompany: "شركة خيرية",
};

const statusConfig = {
    Pending: { label: "معلق", class: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800" },
    Confirmed: { label: "مؤكد", class: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800" },
    Archived: { label: "مؤرشف", class: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800" },
    Rejected: { label: "مرفوض", class: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800" },
};

const RequestDetailsPage = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();

    const { data: requestRes, isPending, isError } = useRequestDetails(requestId!);
    const canView = usePermission(ACTIONS.REQUEST_DETAIL);

    if (!canView) return <Unauthorized />;

    if (isError) return <ErrorState />;

    if (isPending) {
        return (
            <div className="flex flex-col h-[400px] w-full items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse font-bold">جاري جلب تفاصيل الطلب...</p>
            </div>
        );
    }

    // destrcturing the elements of the request
    const request = requestRes?.data;
    const { RequestInfo, UserInfo } = request;
    const status = RequestInfo.requestStatus;
    const statusMeta = statusConfig[status] || { label: status, class: "bg-muted text-muted-foreground" };
    const fileTypeLabel = fileTypeConfig[RequestInfo.fileType] || RequestInfo.fileType;

    const displayDate = RequestInfo.createdAt || "غير متوفر";

    const infoItems = [
        { label: "رقم الطلب", value: `#${RequestInfo.id}`, icon: Hash },
        { label: "نوع الملف", value: fileTypeLabel, icon: FileText },
        { label: "الاسم التجاري للمنشأة", value: RequestInfo.tradeName, icon: Briefcase },
        { label: "ملاحظات الطلب", value: RequestInfo.note, icon: ClipboardList },
        { label: "تاريخ الطلب", value: displayDate, icon: Calendar },
        { label: "مقدم الطلب", value: `${UserInfo.firstName} ${UserInfo.lastName}`, icon: UserIcon },
        { label: "رقم الهاتف", value: UserInfo.phone, icon: Phone },
        { label: "قسم مقدم الطلب", value: UserInfo.department?.name, icon: Building2 },
        { label: "اسم المستخدم", value: UserInfo.userName, icon: Hash },
    ];

    // Documents to display - STRICTLY excluding the 5 nullable sensitive fields
    const documentItems = [
        { label: "نسخة بطاقة الهوية للمرسل", value: UserInfo.idCard },
        { label: "السجل التجاري", value: RequestInfo.commercialRecord },
        { label: "رخصة النشاط التجاري", value: RequestInfo.activityLicense },
        { label: "صورة اللوحة التجارية", value: RequestInfo.tradePict },
        { label: "بطاقة التأمين الاجتماعي", value: RequestInfo.insuranceCard },
        { label: "وثيقة ملكية العقار", value: RequestInfo.propertyDocPict },
    ];



    return (
        <div className="container mx-auto animate-in fade-in duration-500 space-y-8 pt-2 pb-12 text-right" dir="rtl">
            {/* Top Navigation / Actions */}
            <div className="flex justify-between items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-foreground">تفاصيل طلب المنشأة</span>
                    <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-xs font-extrabold border ${statusMeta.class}`}>
                        {statusMeta.label}
                    </Badge>
                </div>
                <Button
                    variant="secondary"
                    onClick={() => navigate(-1)}
                    className="rounded-xl hover:bg-accent cursor-pointer h-10 px-5 font-bold"
                >
                    <ArrowLeft className="ml-2 h-4 w-4" /> رجوع
                </Button>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Profile Banner Card */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl overflow-hidden border shadow-sm">
                    <div className="h-28 bg-primary/5 w-full relative">
                        <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
                    </div>
                    <CardContent className="px-8 pb-6 -mt-12 relative flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="w-24 h-24 rounded-full border-4 border-background bg-muted overflow-hidden shadow-md shrink-0">
                            {UserInfo.image ? (
                                <img src={UserInfo.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                                    <UserIcon size={40} />
                                </div>
                            )}
                        </div>
                        <div className="space-y-1 mb-2 text-center md:text-right">
                            <h2 className="text-2xl font-black text-foreground">{UserInfo.firstName} {UserInfo.lastName}</h2>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                <span className="px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">{UserInfo.role || "مستخدم المحمول"}</span>
                                <span className="px-3 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-bold">{UserInfo.department?.name || "القسم العام"}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Info Cards */}
                {infoItems.map((item, index) => (
                    <Card key={index} className="rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group">
                        <CardContent className="p-5 flex items-center gap-4 text-right">
                            <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                                <item.icon size={22} className="text-primary/80" />
                            </div>
                            <div className="space-y-0.5 overflow-hidden">
                                <p className="text-xs text-muted-foreground font-bold">{item.label}</p>
                                <p className="text-base font-black truncate text-foreground">
                                    {item.value || "غير متوفر"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Section Title for Documents */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-4 flex items-center gap-4">
                    <h3 className="text-lg font-black shrink-0">المستندات والوثائق المرفقة</h3>
                    <div className="h-px bg-border w-full" />
                </div>

                {/* Document Cards */}
                {documentItems.map((doc, index) => (
                    <Card key={index} className="rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group">
                        <CardContent className="p-5 flex items-center gap-4 text-right">
                            <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                                <FileText size={22} className="text-primary/80" />
                            </div>
                            <div className="space-y-0.5 overflow-hidden">
                                <p className="text-xs text-muted-foreground font-bold">{doc.label}</p>
                                {doc.value ? (
                                    <Button
                                        variant="link"
                                        className="p-0 h-auto font-black text-base text-primary hover:text-primary-hover cursor-pointer"
                                        onClick={() => window.open(doc.value!, '_blank')}
                                    >
                                        عرض المستند المرفق
                                    </Button>
                                ) : (
                                    <p className="text-base font-bold truncate text-muted-foreground/40 italic">غير متوفر</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Contextual Action Buttons Container */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-6">
                    <RequestActions status={status} requestId={RequestInfo.id} taxPayerId={request.taxPayerId} />
                </div>
            </div>
        </div>
    );
};

export default RequestDetailsPage;
