import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { TaxCollector } from "@/types";

interface TaxCollectorDetailsDialogProps {
    taxCollector: TaxCollector;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TaxCollectorDetailsDialog = ({ taxCollector, open, onOpenChange }: TaxCollectorDetailsDialogProps) => {
    const infoItems = [
        { label: "رقم المأمور", value: taxCollector.id },
        { label: "الاسم الكامل", value: taxCollector.fullName },
        { label: "رقم الهاتف", value: taxCollector.phone },
        { label: "نوع التوظيف", value: taxCollector.jobType?.name },
        { label: "القسم", value: taxCollector.department?.name },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] rounded-2xl p-6" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-right">تفاصيل المأمور</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-right">
                    {infoItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3">
                            <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
                            <span className="font-medium">{item.value || "غير متوفر"}</span>
                        </div>
                    ))}

                    <div className="border-b pb-3">
                        <span className="text-sm text-muted-foreground font-medium">نسخة بطاقة الهوية</span>
                        <div className="mt-2">
                            {taxCollector.idCard ? (
                                <div className="space-y-3">
                                    <p className="font-bold">الملف الرقمي</p>
                                    <Button asChild variant="outline" className="rounded-xl gap-2">
                                        <a href={taxCollector.idCard} target="_blank" rel="noreferrer" className="text-red-500 hover:text-red-600">
                                            <ExternalLink className="h-4 w-4" />
                                            عرض الملف
                                        </a>
                                    </Button>
                                </div>
                            ) : (
                                <p className="font-bold">غير متوفر</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-4">
                    <Button
                        variant="secondary"
                        onClick={() => onOpenChange(false)}
                        className="rounded-xl"
                    >
                        <ArrowLeft className="h-4 w-4 ml-2" />
                        رجوع
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};