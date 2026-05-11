import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { TaxCollector } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface TaxCollectorDetailsDialogProps {
    taxCollector: TaxCollector;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TaxCollectorDetailsDialog = ({ taxCollector, open, onOpenChange }: TaxCollectorDetailsDialogProps) => {
    const infoItems = [
        { label: "رقم المأمور", value: taxCollector.id },
        { label: "رقم الهاتف", value: taxCollector.phone },
        { label: "نوع التوظيف", value: taxCollector.jobType?.name },
        { label: "القسم", value: taxCollector.department?.name },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[650px] rounded-3xl p-0 overflow-hidden border-none bg-gray-50 dark:bg-[#0b0f1a] shadow-2xl" dir="rtl">
                <div className="overflow-y-auto max-h-[90vh] p-8">
                    {/* Simple Title - Red colored accent */}
                    <div className="mb-8 text-right border-r-4 border-red-600 pr-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">تفاصيل المأمور</h2>
                        <p className="text-red-600 font-medium text-sm">{taxCollector.fullName}</p>
                    </div>

                    {/* Details Grid - Exact match to ShowUser.tsx colors and styles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {infoItems.map((item, index) => (
                            <Card key={index} className="rounded-2xl border border-gray-200/60 dark:border-white/5 shadow-sm bg-white dark:bg-[#111827] overflow-hidden hover:shadow-md transition-shadow">
                                <CardContent className="p-5 text-right space-y-1">
                                    <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                                    <p className="text-lg font-bold truncate">
                                        {item.value || "غير متوفر"}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}

                        {/* ID Card Item */}
                        <Card className="rounded-2xl border border-gray-200/60 dark:border-white/5 shadow-sm bg-white dark:bg-[#111827] md:col-span-2 overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-5 flex items-center justify-between gap-4 text-right">
                                <div className="space-y-1 overflow-hidden">
                                    <p className="text-sm text-muted-foreground font-medium">نسخة بطاقة الهوية</p>
                                    <p className="text-lg font-bold truncate">الملف الرقمي</p>
                                </div>

                                {taxCollector.idCard ? (
                                    <Button
                                        variant="link"
                                        onClick={() => window.open(taxCollector.idCard, '_blank')}
                                        className="p-0 h-auto font-bold text-lg text-red-600 hover:text-red-700 cursor-pointer transition-colors"
                                    >
                                        عرض الملف
                                    </Button>
                                ) : (
                                    <p className="text-lg font-bold truncate">غير متوفر</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom Button */}
                    <div className="flex justify-end pt-2">
                        <Button 
                            variant="secondary"
                            onClick={() => onOpenChange(false)} 
                            className="rounded-xl hover:bg-accent cursor-pointer h-12 px-8 flex items-center gap-2 font-bold shadow-sm"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            رجوع
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
