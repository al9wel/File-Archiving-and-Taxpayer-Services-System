import DashboardHeader from "@/components/layout/DahsboardHeader"
import { NotificationForm } from "../components/NotificationForm"
import { useNotification } from "../hooks/useNotification"
import { useUpdateNotification } from "../hooks/useUpdateNotification"
import { useNavigate, useParams } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

const UpdateNotification = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: notification, isPending: isFetching, isError } = useNotification(id!)
    const { mutate: updateNotification, isPending } = useUpdateNotification()
    const canUpdate = usePermission(ACTIONS.UPDATE_NOTIFICATION)

    const handleCancel = () => navigate(ROUTES.DASHBOARD.NOTIFICATIONS)

    const handleSubmit = (formData: FormData) => {
        updateNotification({ id: id!, data: formData }, {
            onSuccess: (res) => {
                toast.success(res.message || "تم تحديث الإشعار بنجاح")
                setTimeout(() => {
                    navigate(ROUTES.DASHBOARD.NOTIFICATIONS)
                }, 1000)
            },
            onError: (error: any) => {
                toast.error(error.message || "فشل تحديث الإشعار")
            }
        })
    }

    if (isError) {
        return <ErrorState />
    }

    if (isFetching) {
        return (
            <div className="flex flex-col h-[400px] w-full items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">جاري جلب بيانات الإشعار...</p>
            </div>
        )
    }

    if (!canUpdate) return <Unauthorized />

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title="تعديل الإشعار"
                    desc={`تعديل بيانات الإشعار: ${notification?.data?.title}`}
                />
            </div>
            <div className="container mx-auto px-3 py-6 animate-in fade-in duration-500 space-y-4">
                <div className="flex justify-end" dir="rtl">
                    <Button
                        variant="secondary"
                        onClick={handleCancel}
                        className="h-11 rounded-xl px-5 font-bold cursor-pointer"
                    >
                        <ArrowRight className="ml-2 h-4 w-4" />
                        رجوع
                    </Button>
                </div>
                <NotificationForm initialData={notification?.data} onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isPending} />
            </div>
        </>
    )
}

export default UpdateNotification
