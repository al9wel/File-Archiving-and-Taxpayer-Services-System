import { useState } from "react"
import { AlertTriangle, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import type { RecycleBin } from "@/types/RecycleBin"
import { usePermanentDeleteTrashItem } from "../hooks/usePermanentDeleteTrashItem"
import { toast } from "sonner"

export const PermanentDeleteDialog = ({ item }: { item: RecycleBin }) => {
    const [isOpen, setIsOpen] = useState(false)
    const permanentDeleteTrashItem = usePermanentDeleteTrashItem()

    const handleDelete = () => {
        permanentDeleteTrashItem.mutate(item.recycle_pin_id, {
            onSuccess: (res) => {
                toast.success(res.message || "تم حذف العنصر نهائياً")
                setIsOpen(false)
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء حذف العنصر نهائياً")
            },
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm" dir="rtl">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <AlertDialogTitle className="text-right">حذف نهائي</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-right pt-2 space-y-1">
                        <span className="block">هل أنت متأكد من حذف هذا العنصر نهائياً؟</span>
                        <span className="block text-destructive font-bold text-xs">لا يمكن التراجع عن هذا الإجراء.</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row-reverse gap-3">
                    <AlertDialogAction
                        onClick={(event) => {
                            event.preventDefault()
                            handleDelete()
                        }}
                        variant="destructive"
                        className="rounded-lg min-w-[110px]"
                        disabled={permanentDeleteTrashItem.isPending}
                    >
                        {permanentDeleteTrashItem.isPending ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>جاري الحذف...</span>
                            </div>
                        ) : (
                            "تأكيد الحذف"
                        )}
                    </AlertDialogAction>
                    <AlertDialogCancel className="rounded-lg" disabled={permanentDeleteTrashItem.isPending}>
                        إلغاء
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
