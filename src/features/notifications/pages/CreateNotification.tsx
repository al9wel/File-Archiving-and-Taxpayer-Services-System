import DashboardHeader from "@/components/layout/DahsboardHeader"
import { NotificationForm } from "../components/NotificationForm"
import { useCreateNotification } from "../hooks/useCreateNotification"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const CreateNotification = () => {
    const navigate = useNavigate()
    const { mutate: createNotification, isPending } = useCreateNotification()
    const canCreate = usePermission(ACTIONS.CREATE_NOTIFICATION)

    const handleCancel = () => navigate(ROUTES.DASHBOARD.NOTIFICATIONS)

    const handleSubmit = (formData: FormData) => {
        createNotification(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة الإشعار بنجاح")
                setTimeout(() => {
                    navigate(ROUTES.DASHBOARD.NOTIFICATIONS)
                }, 1000)
            },
            onError: (error: any) => {
                toast.error(error.message || "فشل إضافة الإشعار")
            }
        })
    }

    if (!canCreate) return <Unauthorized />

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" اضافه اشعار "
                    desc="أدخل بيانات الإشعار الجديد لإرساله للمستلمين."
                />
            </div>
            <div className=" mx-auto px-3 py-6 animate-in fade-in duration-500 space-y-4">
                <div className="flex justify-end" dir="rtl">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCancel}
                        className="h-11 rounded-xl px-5 font-bold cursor-pointer"
                    >
                        <ArrowRight className="ml-2 h-4 w-4" />
                        رجوع
                    </Button>
                </div>
                <NotificationForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isPending} />
            </div>
        </>
    )
}

export default CreateNotification
