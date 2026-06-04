import { FileMovementForm } from "../components/FileMovementForm"
import { useUpdateFileMovement } from "../hooks/useUpdateFileMovement"
import { useFileMovement } from "../hooks/useFileMovement"
import DashboardHeader from "@/components/layout/DahsboardHeader"
import { useNavigate, useParams } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

const UpdateFileMovement = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const canUpdate = usePermission(ACTIONS.UPDATE_FILE_MOVEMENT)

    const { data: fileMovement, isPending: isLoadingData, isError } = useFileMovement(id as string)
    const updateMutation = useUpdateFileMovement()

    if (!canUpdate) return <Unauthorized />

    if (isError) return <ErrorState />

    const handleSubmit = (data: FormData) => {
        if (!id) return
        updateMutation.mutate({ id, data }, {
            onSuccess: (res) => {
                toast.success(res?.message || "تم تحديث بيانات حركة الملف بنجاح")
                setTimeout(() => {
                    navigate(ROUTES.DASHBOARD.FILE_MOVEMENTS)
                }, 1000)
            },
            onError: (error) => {
                toast.error(error?.message || "فشل في تحديث حركة الملف")
            }
        })
    }

    return (
        <div className="p-3">
            <DashboardHeader
                title=" تحديث حركة ملف "
                desc="قم بتحديث بيانات تفاصيل الحركة المختارة"
            />

            <div className="mx-auto px-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {isLoadingData ? (
                    <div className="flex flex-col h-[400px] items-center justify-center space-y-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-muted-foreground animate-pulse">جاري تحميل البيانات...</p>
                    </div>
                ) : fileMovement?.data ? (
                    <FileMovementForm
                        initialData={fileMovement.data}
                        onSubmit={handleSubmit}
                        isLoading={updateMutation.isPending}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default UpdateFileMovement
