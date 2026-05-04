import { useState } from "react"
import type { User } from "@/types/User"
import { useDeleteUser } from "../hooks/useDeleteUser"
import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2, Loader2, AlertTriangle } from "lucide-react"
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

export const Actions = ({ user }: { user: User }) => {
    const [isOpen, setIsOpen] = useState(false)
    const deleteUser = useDeleteUser()
    const canUpdate = usePermission(ACTIONS.UPDATE_USER);
    const canDelete = usePermission(ACTIONS.DELETE_USER);
    const canView = usePermission(ACTIONS.VIEW_USER);

    const handleDelete = () => {
        deleteUser.mutate(user.id, {
            onSuccess: () => {
                toast.success("تم حذف المستخدم بنجاح")
                setIsOpen(false)
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء حذف المستخدم")
            }
        })
    }

    return (
        <div className="flex items-center justify-center gap-2">
            {canView && (
                <NavLink to={ROUTES.DASHBOARD.USERS_SHOW.replace(":id", user.id.toString())}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                        <Eye className="h-4 w-4" />
                    </Button>
                </NavLink>
            )}
            {canUpdate && (
                <NavLink to={ROUTES.DASHBOARD.USERS_EDIT.replace(":id", user.id.toString())}>
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
                                <AlertDialogTitle className="text-right">حذف المستخدم</AlertDialogTitle>
                            </div>
                            <AlertDialogDescription className="text-right pt-2">
                                هل أنت متأكد من حذف الموظف <span className="font-bold text-foreground">{user.firstName} {user.lastName}</span>؟
                                <br />
                                لا يمكن التراجع عن هذا الإجراء وسيتم إزالة كافة بياناته من النظام.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-row-reverse gap-3">
                            <AlertDialogAction
                                onClick={(e) => {
                                    e.preventDefault() // Prevent auto-close
                                    handleDelete()
                                }}
                                variant="destructive"
                                className="rounded-lg min-w-[100px]"
                                disabled={deleteUser.isPending}
                            >
                                {deleteUser.isPending ? (
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
                                disabled={deleteUser.isPending}
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

