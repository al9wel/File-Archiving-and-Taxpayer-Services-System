import { useState } from "react"
import type { IndividualTaxPayer } from "@/types/IndividualTaxPayer"
import { useDeleteIndividualTaxPayer } from "../../../hooks/tax-payers/individual/useDeleteIndividualTaxPayer"
import { useDeleteUser } from "@/features/users/hooks/useDeleteUser"
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

export const IndividualTaxPayerActions = ({ payer }: { payer: IndividualTaxPayer }) => {
    const [isOpen, setIsOpen] = useState(false)
    const deletePayer = useDeleteIndividualTaxPayer()
    const deleteUser = useDeleteUser()
    const canUpdate = usePermission(ACTIONS.UPDATE_TAX_PAYER);
    const canDelete = usePermission(ACTIONS.DELETE_TAX_PAYER);
    const canView = usePermission(ACTIONS.VIEW_TAX_PAYER);

    const handleDelete = () => {
        deletePayer.mutate(payer.taxPayer.id, {
            onSuccess: () => {
                deleteUser.mutate(payer.userInfo.id, {
                    onSuccess: () => {
                        toast.success("تم حذف المكلف وكافة بياناته بنجاح")
                        setIsOpen(false)
                    },
                    onError: (error: any) => {
                        toast.error(error.message || "حدث خطأ أثناء حذف بيانات المستخدم")
                        setIsOpen(false)
                    }
                })
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء حذف بيانات المكلف")
                setIsOpen(false)
            }
        })
    }

    return (
        <div className="flex items-center justify-center gap-2">
            {canView && (
                <NavLink to={ROUTES.DASHBOARD.TAXPAYERS.PAYERS.SHOW.replace(":id", payer.userInfo.id.toString())}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                        <Eye className="h-4 w-4" />
                    </Button>
                </NavLink>
            )}
            {canUpdate && (
                <NavLink to={ROUTES.DASHBOARD.TAXPAYERS.PAYERS.EDIT.replace(":id", payer.userInfo.id.toString())}>
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
                                <AlertDialogTitle className="text-right">حذف المكلف</AlertDialogTitle>
                            </div>
                            <AlertDialogDescription className="text-right pt-2 space-y-1">
                                <div>هل أنت متأكد من حذف المكلف <span className="font-bold text-foreground">{payer.userInfo.fullName}</span>؟</div>
                                <div className="text-destructive font-bold text-xs">تنبيه: سيتم حذف هذا المكلف وكافة بيانات المستخدم المرتبط به.</div>
                                <div className="text-muted-foreground text-xs pt-1">لا يمكن التراجع عن هذا الإجراء وسيتم إزالة كافة بياناته من النظام.</div>
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
                                disabled={deletePayer.isPending || deleteUser.isPending}
                            >
                                {deletePayer.isPending || deleteUser.isPending ? (
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
                                disabled={deletePayer.isPending || deleteUser.isPending}
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
