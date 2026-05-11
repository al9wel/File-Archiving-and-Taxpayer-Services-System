import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye, AlertTriangle, Loader2, ArrowLeft } from "lucide-react";
import type { TaxInfo } from "@/types/TaxInfo";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import { toast } from "sonner";
import { useDeleteTaxInfo } from "../../hooks/tax-info/useDeleteTaxInfo";
import { useUpdateTaxInfo } from "../../hooks/tax-info/useUpdateTaxInfo";
import { TaxInfoForm } from "./TaxInfoForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface TaxInfoActionsProps {
    taxInfo: TaxInfo;
}

export const TaxInfoActions = ({ taxInfo }: TaxInfoActionsProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const canUpdate = usePermission(ACTIONS.UPDATE_TAX_PAYER);
    const canDelete = usePermission(ACTIONS.DELETE_TAX_PAYER);
    const canView = usePermission(ACTIONS.VIEW_TAX_PAYER);

    const { mutate: deleteInfo, isPending: isDeleting } = useDeleteTaxInfo();
    const { mutate: updateInfo, isPending: isUpdating } = useUpdateTaxInfo();

    const handleDelete = () => {
        deleteInfo(taxInfo.taxInfo.id, {
            onSuccess: () => {
                toast.success("تم حذف البيانات الضريبية بنجاح");
                setIsDeleteDialogOpen(false);
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء حذف البيانات الضريبية");
            }
        });
    };

    const handleUpdate = (formData: FormData) => {
        updateInfo(
            { id: taxInfo.taxInfo.id, data: formData },
            {
                onSuccess: (res) => {
                    toast.success(res.message || "تم تحديث البيانات الضريبية بنجاح");
                    setIsEditDialogOpen(false);
                },
                onError: (error: any) => {
                    toast.error(error.message || "حدث خطأ أثناء تحديث البيانات الضريبية");
                }
            }
        );
    };

    const labels: Record<string, string> = {
        "Individual": "فرد",
        "Company": "شركة",
        "CharitableCompany": "شركة خيرية"
    };

    const infoItems = [
        { label: "رقم البيانات الضريبية", value: taxInfo.taxInfo.id },
        { label: "رقم المكلف", value: taxInfo.taxInfo.taxPayerId },
        { label: "الإسم التجاري", value: taxInfo.taxInfo.taxPayer?.tradeName || "—" },
        { label: "نوع الضريبة", value: taxInfo.taxInfo.taxType?.name || "—" },
        { label: "مبلغ الضريبة", value: taxInfo.taxInfo.taxAmount, color: "text-red-500" },
        { label: "آخر دفعة", value: taxInfo.taxInfo.lastPayment, color: "text-red-500" },
    ];

    return (
        <div className="flex items-center justify-center gap-2">
            {/* View Action */}
            {canView && (
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <Eye className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[650px] rounded-3xl p-0 overflow-hidden border-none bg-gray-50 dark:bg-[#0b0f1a] shadow-2xl" dir="rtl">
                        <div className="overflow-y-auto max-h-[90vh] p-8 text-right">
                            {/* Title - Primary colored accent */}
                            <div className="mb-8 border-r-4 border-primary pr-4">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">تفاصيل البيانات الضريبية</h2>
                                <p className="text-primary font-medium text-sm">
                                    {"مكلف " + labels[taxInfo.taxInfo.taxPayer?.fileType || ""] || "—"}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {infoItems.map((item, index) => (
                                    <Card key={index} className="rounded-2xl border border-gray-200/60 dark:border-white/5 shadow-sm bg-white dark:bg-[#111827] overflow-hidden hover:shadow-md transition-shadow">
                                        <CardContent className="p-5 space-y-1">
                                            <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                                            <p className={`text-lg font-bold truncate ${item.color || ""}`}>
                                                {item.value || "غير متوفر"}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            
                            <div className="flex justify-end pt-2">
                                <Button 
                                    variant="secondary"
                                    onClick={() => setIsViewDialogOpen(false)} 
                                    className="rounded-xl hover:bg-accent cursor-pointer h-12 px-8 flex items-center gap-2 font-bold shadow-sm"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    رجوع
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* Edit Action */}
            {canUpdate && (
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Pencil className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] rounded-2xl p-6" dir="rtl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-right">تعديل البيانات الضريبية</DialogTitle>
                        </DialogHeader>
                        <TaxInfoForm
                            initialData={{
                                taxPayerId: taxInfo.taxInfo.taxPayerId,
                                taxTypeId: taxInfo.taxInfo.taxTypeId,
                                taxAmount: taxInfo.taxInfo.taxAmount,
                                lastPayment: taxInfo.taxInfo.lastPayment,
                            }}
                            onSubmit={handleUpdate}
                            onCancel={() => setIsEditDialogOpen(false)}
                            isLoading={isUpdating}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {/* Delete Action */}
            {canDelete && (
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 text-destructive hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md rounded-2xl p-6" dir="rtl">
                        <DialogHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <DialogTitle className="text-right">حذف البيانات الضريبية</DialogTitle>
                            </div>
                        </DialogHeader>
                        <div className="space-y-4 text-right pt-4">
                            <p className="text-sm text-muted-foreground">
                                هل أنت متأكد من حذف البيانات الضريبية للمكلف <span className="font-bold text-foreground">{taxInfo.taxInfo.taxPayer?.tradeName || "—"}</span>؟
                                <br />لا يمكن التراجع عن هذا الإجراء.
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-3 mt-6">
                            <Button variant="outline" className="rounded-xl" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>إلغاء</Button>
                            <Button variant="destructive" className="rounded-xl min-w-[120px]" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : "تأكيد الحذف"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
