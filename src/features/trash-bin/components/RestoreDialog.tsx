import { useState } from "react"
import { RotateCcw, Loader2 } from "lucide-react"
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
import { useRestoreTrashItem } from "../hooks/useRestoreTrashItem"
import { toast } from "sonner"

export const RestoreDialog = ({ item }: { item: RecycleBin }) => {
    const [isOpen, setIsOpen] = useState(false)
    const restoreTrashItem = useRestoreTrashItem()

    const handleRestore = () => {
        restoreTrashItem.mutate(item.recycle_pin_id, {
            onSuccess: (res) => {
                toast.success(res.message || "تم استرجاع العنصر بنجاح")
                setIsOpen(false)
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء استرجاع العنصر")
            },
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600">
                    <RotateCcw className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm" dir="rtl">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                            <RotateCcw className="h-6 w-6" />
                        </div>
                        <AlertDialogTitle className="text-right">استرجاع العنصر</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-right pt-2">
                        هل أنت متأكد من استرجاع هذا العنصر من سلة المحذوفات؟
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row-reverse gap-3">
                    <AlertDialogAction
                        onClick={(event) => {
                            event.preventDefault()
                            handleRestore()
                        }}
                        className="rounded-lg min-w-[110px] bg-emerald-600 hover:bg-emerald-700 text-white"
                        disabled={restoreTrashItem.isPending}
                    >
                        {restoreTrashItem.isPending ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>جاري الاسترجاع...</span>
                            </div>
                        ) : (
                            "تأكيد الاسترجاع"
                        )}
                    </AlertDialogAction>
                    <AlertDialogCancel className="rounded-lg" disabled={restoreTrashItem.isPending}>
                        إلغاء
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
