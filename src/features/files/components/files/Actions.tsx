import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pencil, Eye, Trash2 } from "lucide-react";
import type { File } from "@/types/File";
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
import { toast } from "sonner"
import { useDeleteFile } from "../../hooks/files/useDeleteFile"
import { usePermission } from "@/hooks/usePermission";
import { ACTIONS } from "@/constants/permissions";
import { ROUTES } from "@/constants/routes";

interface ActionsProps {
    file: File['fileInfo'];
}

const Actions = ({ file }: ActionsProps) => {
    const canUpdate = usePermission(ACTIONS.UPDATE_FILE);
    const canDelete = usePermission(ACTIONS.DELETE_FILE);
    const canView = usePermission(ACTIONS.VIEW_FILE);
    const { mutate: deleteFile, isPending } = useDeleteFile();

    const handleDelete = () => {
        deleteFile(file.id, {
            onSuccess: (res: any) => {
                toast.success(res.message || "تم حذف الملف بنجاح");
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء حذف الملف");
            }
        })
    }

    return (
        <div className="flex items-center justify-center gap-2">
            {canView && (
                <Link to={`${ROUTES.DASHBOARD.FILES.ROOT}/${file.id}`}>
                    <Button variant="ghost" size="icon" className="size-8 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Eye className="size-4" />
                    </Button>
                </Link>
            )}
            {canUpdate && (
                <Link to={`${ROUTES.DASHBOARD.FILES.ROOT}/${file.id}/edit`}>
                    <Button variant="ghost" size="icon" className="size-8 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="size-4" />
                    </Button>
                </Link>
            )}
            {canDelete && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 text-destructive hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="size-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent dir="rtl" className="rounded-2xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-right">حذف الملف</AlertDialogTitle>
                            <AlertDialogDescription className="text-right">
                                هل أنت متأكد من حذف ملف {file.taxPayer?.tradeName}؟ هذا الإجراء لا يمكن التراجع عنه.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="sm:justify-start gap-2">
                            <AlertDialogCancel className="rounded-xl">إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} disabled={isPending} className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                {isPending ? "جاري الحذف..." : "تأكيد الحذف"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
};

export default Actions;