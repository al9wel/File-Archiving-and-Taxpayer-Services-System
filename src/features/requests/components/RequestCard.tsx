import type { Request } from "@/types/Requests";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, FileSpreadsheet, Calendar, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface RequestCardProps {
    request: Request;
}

const statusConfig = {
    Pending: { label: "معلق", class: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800" },
    Confirmed: { label: "مؤكد", class: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800" },
    Archived: { label: "مؤرشف", class: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800" },
    Rejected: { label: "مرفوض", class: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800" },
};

const fileTypeConfig = {
    Individual: "فردي",
    Company: "شركة",
    CharitableCompany: "شركة خيرية",
};

const RequestCard = ({ request }: RequestCardProps) => {
    const { RequestInfo, UserInfo } = request;
    const status = RequestInfo.requestStatus;
    const statusMeta = statusConfig[status] || { label: status, class: "bg-muted text-muted-foreground" };
    const fileTypeLabel = fileTypeConfig[RequestInfo.fileType] || RequestInfo.fileType;

    const displayDate = RequestInfo.createdAt || "غير متوفر";

    return (
        <Link to={`/dashboard/requests/${status.toLowerCase()}/${RequestInfo.id}`} className="block group">
            <Card className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/20 dark:hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">

                {/* Decorative border bar based on status */}
                <div className={`absolute top-0 right-0 left-0 h-1.5 ${status === "Pending" ? "bg-amber-400" :
                    status === "Confirmed" ? "bg-emerald-500" :
                        status === "Archived" ? "bg-slate-400" :
                            "bg-rose-500"
                    }`} />

                <CardContent className="p-6 pt-7 text-right flex flex-col h-full justify-between">
                    <div>
                        {/* Card Header (ID and Status Badge) */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                                <span>طلب رقم:</span>
                                <span className="font-mono text-foreground font-black">#{RequestInfo.id}</span>
                            </span>
                            <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-xs font-extrabold border ${statusMeta.class}`}>
                                {statusMeta.label}
                            </Badge>
                        </div>

                        {/* Trade Name */}
                        <h3 className="text-lg font-black text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-1">
                            {RequestInfo.tradeName}
                        </h3>

                        {/* Summary Info list */}
                        <div className="space-y-2.5 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-muted-foreground/60 shrink-0" />
                                <span className="truncate">
                                    المرسل: <strong className="text-foreground/80 font-bold">{UserInfo.firstName} {UserInfo.lastName}</strong>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-muted-foreground/60 shrink-0" />
                                <span className="font-mono">{UserInfo.phone || "غير متوفر"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileSpreadsheet size={16} className="text-muted-foreground/60 shrink-0" />
                                <span>
                                    نوع الملف: <strong className="text-foreground/80 font-bold">{fileTypeLabel}</strong>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Card Footer (Date and Details Link) */}
                    <div className="border-t border-dashed border-border/80 pt-4 mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5 font-bold">
                            <Calendar size={14} className="text-muted-foreground/50 shrink-0" />
                            <span>تاريخ التقديم: {displayDate}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-primary group-hover:translate-x-[-4px] transition-transform duration-200 font-extrabold">
                            <span>التفاصيل</span>
                            <ChevronLeft size={14} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default RequestCard;
