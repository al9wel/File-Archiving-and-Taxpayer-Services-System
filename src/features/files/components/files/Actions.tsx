import { useState } from "react"
import type { File } from "@/types/File"
import { useDeleteFile } from "../../hooks/files/useDeleteFile"
import { useFileReport } from "../../hooks/files/useFileReport"
import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Eye, FileText, Pencil, Trash2, Loader2, AlertTriangle } from "lucide-react"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ACTIONS } from "@/constants/permissions"
import { usePermission } from "@/hooks/usePermission"

export const Actions = ({ file }: { file: File['fileInfo'] }) => {
    const [isOpen, setIsOpen] = useState(false)
    const deleteFile = useDeleteFile()
    const { mutateAsync: getFileReport, isPending: isFileReportLoading } = useFileReport()
    const canUpdate = usePermission(ACTIONS.UPDATE_FILE);
    const canDelete = usePermission(ACTIONS.DELETE_FILE);
    const canView = usePermission(ACTIONS.VIEW_FILE);

    const handleDelete = () => {
        deleteFile.mutate(file.id, {
            onSuccess: () => {
                toast.success("تم حذف الملف بنجاح")
                setIsOpen(false)
            },
            onError: (error) => {
                toast.error(error.message || "حدث خطأ أثناء حذف الملف")
            }
        })
    }

    const handleFileReport = async () => {
        try {
            const response = await getFileReport(file.id)

            const reportUrl = response?.data?.report_url

            if (!reportUrl) {
                toast.error("تعذر الحصول على رابط التقرير")
                return
            }

            window.open(
                reportUrl,
                "_blank",
                "noopener,noreferrer"
            )
        } catch {
            toast.error("حدث خطأ أثناء إنشاء التقرير")
        }
    }

    return (
        <div className="flex items-center justify-center gap-2">
            {canView && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-emerald-600"
                    onClick={handleFileReport}
                    disabled={isFileReportLoading}
                    title="تقرير الملف"
                >
                    {isFileReportLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <FileText className="h-4 w-4" />
                    )}
                </Button>
            )}
            {canView && (
                <NavLink to={ROUTES.DASHBOARD.FILES_SHOW.replace(":id", file.id.toString())}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                        <Eye className="h-4 w-4" />
                    </Button>
                </NavLink>
            )}
            {canUpdate && (
                <NavLink to={ROUTES.DASHBOARD.FILES_EDIT.replace(":id", file.id.toString())}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Pencil className="h-4 w-4" />
                    </Button>
                </NavLink>
            )}
            {canDelete && (
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm" dir="rtl">
                        <AlertDialogHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <AlertDialogTitle className="text-right">حذف الملف</AlertDialogTitle>
                            </div>
                            <AlertDialogDescription className="text-right pt-2 space-y-1">
                                <span className="block">هل أنت متأكد من حذف الملف الخاص بالمكلف <span className="font-bold text-foreground">{file.taxPayer?.tradeName || file.taxNumber}</span>؟</span>
                                <span className="block text-muted-foreground text-xs pt-1">لا يمكن التراجع عن هذا الإجراء وسيتم إزالة الملف من النظام.</span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-row-reverse gap-3">
                            <AlertDialogAction
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleDelete()
                                }}
                                variant="destructive"
                                className="rounded-lg min-w-[100px]"
                                disabled={deleteFile.isPending}
                            >
                                {deleteFile.isPending ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>جاري الحذف...</span>
                                    </div>
                                ) : (
                                    "تأكيد الحذف"
                                )}
                            </AlertDialogAction>
                            <AlertDialogCancel
                                className="rounded-lg"
                                disabled={deleteFile.isPending}
                            >
                                إلغاء
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    )
}
