import { FileMovementForm } from "../components/FileMovementForm"
import { useCreateFileMovement } from "../hooks/useCreateFileMovement"
import DashboardHeader from "@/components/layout/DahsboardHeader"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"

const CreateFileMovement = () => {
    const createMutation = useCreateFileMovement()
    const navigate = useNavigate()
    const canCreate = usePermission(ACTIONS.CREATE_FILE_MOVEMENT)

    if (!canCreate) return <Unauthorized />

    const handleSubmit = (data: FormData) => {
        createMutation.mutate(data, {
            onSuccess: (res) => {
                toast.success(res?.message || "تم إضافة حركة الملف بنجاح")
                setTimeout(() => {
                    navigate(ROUTES.DASHBOARD.FILE_MOVEMENTS)
                }, 1000)
            },
            onError: (error) => {
                toast.error(error?.message || "فشل في إضافة حركة الملف")
            }
        })
    }

    return (
        <div className="p-3">
            <DashboardHeader
                title=" اضافة حركة ملف جديدة "
                desc="قم بإدخال بيانات وتفاصيل الحركة الجديدة لإضافتها إلى النظام"
            />
            <div className="mx-auto px-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <FileMovementForm
                    onSubmit={handleSubmit}
                    isLoading={createMutation.isPending}
                />
            </div>
        </div>
    )
}

export default CreateFileMovement
