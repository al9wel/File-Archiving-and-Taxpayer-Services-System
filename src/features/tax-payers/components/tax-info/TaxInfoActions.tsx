import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, ExternalLink, Eye, Loader2, Pencil, Trash2 } from "lucide-react";
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
import { Link } from "react-router-dom";

interface TaxInfoActionsProps {
    taxInfo: TaxInfo;
}

const fileNameFromUrl = (url?: string) => url?.split("/").pop() || "الملف الحالي";
const isImageAttachment = (url?: string) => Boolean(url && /\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(url));

export const TaxInfoActions = ({ taxInfo }: TaxInfoActionsProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const canUpdate = usePermission(ACTIONS.UPDATE_TAX_PAYER);
    const canDelete = usePermission(ACTIONS.DELETE_TAX_PAYER);
    const canView = usePermission(ACTIONS.VIEW_TAX_PAYER);

    const { mutate: deleteInfo, isPending: isDeleting } = useDeleteTaxInfo();
    const { mutate: updateInfo, isPending: isUpdating } = useUpdateTaxInfo();

    const attachment = taxInfo.taxInfo.attachment;
    const attachmentName = fileNameFromUrl(attachment);
    const hasAttachment = Boolean(attachment);

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
            {canView && (
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <Eye className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] rounded-2xl p-6" dir="rtl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-right">تفاصيل البيانات الضريبية</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 text-right">
                            {infoItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between border-b pb-3">
                                    <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
                                    <span className={`font-medium ${item.color || ""}`}>
                                        {item.value || "غير متوفر"}
                                    </span>
                                </div>
                            ))}

                            <div className="border-b pb-3">
                                <span className="text-sm text-muted-foreground font-medium">ملحقات البيانات الضريبية</span>
                                <div className="mt-2">
                                    {hasAttachment ? (
                                        <div className="space-y-3">
                                            <p className="font-bold">{attachmentName}</p>
                                            {isImageAttachment(attachment) && (
                                                <img src={attachment} alt="Tax attachment" className="max-h-40 rounded-lg object-contain" />
                                            )}
                                            <Button asChild variant="outline" className="rounded-xl gap-2">
                                                <Link to={attachment} target="_blank" rel="noreferrer" className="text-red-500 hover:text-red-600">
                                                    <ExternalLink className="h-4 w-4" />
                                                    عرض المرفق
                                                </Link>
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
                                onClick={() => setIsViewDialogOpen(false)}
                                className="rounded-xl"
                            >
                                <ArrowLeft className="h-4 w-4 ml-2" />
                                رجوع
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
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
                                attachment: taxInfo.taxInfo.attachment,
                            }}
                            onSubmit={handleUpdate}
                            onCancel={() => setIsEditDialogOpen(false)}
                            isLoading={isUpdating}
                        />
                    </DialogContent>
                </Dialog>
            )}
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
