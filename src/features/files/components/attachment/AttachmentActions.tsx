import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, ExternalLink, Eye, Loader2, Pencil, Trash2 } from "lucide-react";
import type { Attachment } from "@/types/Attachment";
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import { toast } from "sonner";
import { useDeleteAttachment } from "../../hooks/attachment/useDeleteAttachment";
import { useUpdateAttachment } from "../../hooks/attachment/useUpdateAttachment";
import { AttachmentForm } from "./AttachmentForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface AttachmentActionsProps {
    attachment: Attachment;
}

const fileNameFromUrl = (url?: string) => url?.split("/").pop() || "الملف الحالي";
const isImageAttachment = (url?: string) => Boolean(url && /\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(url));

export const AttachmentActions = ({ attachment }: AttachmentActionsProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const canUpdate = usePermission(ACTIONS.UPDATE_FILE);
    const canDelete = usePermission(ACTIONS.DELETE_FILE);
    const canView = usePermission(ACTIONS.VIEW_FILE);

    const { mutate: deleteAttachment, isPending: isDeleting } = useDeleteAttachment();
    const { mutate: updateAttachment, isPending: isUpdating } = useUpdateAttachment();

    const attachmentName = fileNameFromUrl(attachment.attachmentFile);
    const hasAttachment = Boolean(attachment.attachmentFile);

    const handleDelete = () => {
        deleteAttachment(attachment.id, {
            onSuccess: () => {
                toast.success("تم حذف المرفق بنجاح");
                setIsDeleteDialogOpen(false);
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء حذف المرفق");
            }
        });
    };

    const handleUpdate = (formData: FormData) => {
        updateAttachment(
            { id: attachment.id, data: formData },
            {
                onSuccess: (res) => {
                    toast.success(res.message || "تم تحديث المرفق بنجاح");
                    setIsEditDialogOpen(false);
                },
                onError: (error: any) => {
                    toast.error(error.message || "حدث خطأ أثناء تحديث المرفق");
                }
            }
        );
    };

    const infoItems = [
        { label: "رقم المرفق", value: attachment.id },
        { label: "العنوان", value: attachment.title },
        { label: "رقم الملف", value: attachment.file?.taxNumber || "—" },
        { label: "اسم المكلف", value: attachment.file?.taxPayer?.tradeName || "—" },
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
                            <DialogTitle className="text-xl font-bold text-right">تفاصيل المرفق</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 text-right">
                            {infoItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between border-b pb-3">
                                    <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
                                    <span className="font-medium">{item.value || "غير متوفر"}</span>
                                </div>
                            ))}

                            <div className="border-b pb-3">
                                <span className="text-sm text-muted-foreground font-medium">ملف المرفق</span>
                                <div className="mt-2">
                                    {hasAttachment ? (
                                        <div className="space-y-3">
                                            <p className="font-bold">{attachmentName}</p>
                                            {isImageAttachment(attachment.attachmentFile) && (
                                                <img src={attachment.attachmentFile} alt="Attachment" className="max-h-40 rounded-lg object-contain" />
                                            )}
                                            <Button asChild variant="outline" className="rounded-xl gap-2">
                                                <a href={attachment.attachmentFile} target="_blank" rel="noreferrer" className="text-red-500 hover:text-red-600">
                                                    <ExternalLink className="h-4 w-4" />
                                                    عرض المرفق
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
                            <DialogTitle className="text-xl font-bold text-right">تعديل المرفق</DialogTitle>
                        </DialogHeader>
                        <AttachmentForm
                            initialData={{
                                title: attachment.title,
                                fileId: attachment.file?.id,
                                attachmentFile: attachment.attachmentFile,
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
                                <DialogTitle className="text-right">حذف المرفق</DialogTitle>
                            </div>
                        </DialogHeader>
                        <div className="space-y-4 text-right pt-4">
                            <p className="text-sm text-muted-foreground">
                                هل أنت متأكد من حذف المرفق <span className="font-bold text-foreground">{attachment.title}</span>؟
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