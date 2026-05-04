import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Phone, Briefcase, Building2, FileText, Shield } from "lucide-react";
import type { TaxCollector } from "@/types";

interface TaxCollectorDetailsDialogProps {
    taxCollector: TaxCollector;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TaxCollectorDetailsDialog = ({ taxCollector, open, onOpenChange }: TaxCollectorDetailsDialogProps) => {
    const infoItems = [
        { label: "رقم المأمور", value: taxCollector.id, icon: Shield },
        { label: "رقم الهاتف", value: taxCollector.phone, icon: Phone },
        { label: "نوع التوظيف", value: taxCollector.jobType?.name, icon: Briefcase },
        { label: "القسم", value: taxCollector.department?.name, icon: Building2 },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[700px] rounded-2xl p-0 overflow-y-auto max-h-[90vh] border-none bg-gray-50 dark:bg-[#0b0f1a]" dir="rtl">
                <DialogHeader className="p-4 bg-white dark:bg-[#111827] border-b">
                    <DialogTitle className="text-xl font-bold text-right flex items-center gap-2">
                        <User className="text-red-600 size-5" />
                        تفاصيل المأمور
                    </DialogTitle>
                </DialogHeader>

                <div className="p-4 space-y-4">
                    <div className="space-y-1 text-right mb-2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{taxCollector.fullName}</h2>
                        <p className="text-red-600 text-sm font-medium">{taxCollector.jobType?.name || taxCollector.jobType?.name || "مأمور"}</p>
                    </div>

                    {/* Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {infoItems.map((item, index) => (
                            <div key={index} className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5 shadow-sm">
                                <div className="flex items-center gap-3 text-right">
                                    <div className="w-9 h-9 rounded-lg bg-red-600/5 text-red-600 flex items-center justify-center shrink-0">
                                        <item.icon size={18} />
                                    </div>
                                    <div className="space-y-0 overflow-hidden">
                                        <p className="text-[11px] text-muted-foreground">{item.label}</p>
                                        <p className="text-sm font-bold truncate">
                                            {item.value || "غير متوفر"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* ID Card Item */}
                        <div className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5 shadow-sm md:col-span-2">
                            <div className="flex items-center justify-between gap-3 text-right">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-red-600/5 text-red-600 flex items-center justify-center shrink-0">
                                        <FileText size={18} />
                                    </div>
                                    <div className="space-y-0">
                                        <p className="text-[11px] text-muted-foreground">نسخة بطاقة الهوية</p>
                                        <p className="text-sm font-bold">الملف الرقمي</p>
                                    </div>
                                </div>

                                {taxCollector.idCard ? (
                                    <Button
                                        onClick={() => window.open(taxCollector.idCard, '_blank')}
                                        className="rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-sm h-9 px-4 text-sm"
                                    >
                                        عرض الملف
                                    </Button>
                                ) : (
                                    <span className="text-muted-foreground text-xs">غير متوفر</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-gray-100 dark:bg-[#111827]/50 flex justify-end">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="rounded-xl px-6 h-10 border-none bg-white dark:bg-muted shadow-sm hover:bg-gray-50 text-sm"
                    >
                        إغلاق
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
