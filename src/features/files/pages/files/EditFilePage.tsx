import DashboardHeader from "@/components/layout/DahsboardHeader"
import { FileForm } from "../../components/files/FileForm"
import { useFile } from "../../hooks/files/useFile"
import { useUpdateFile } from "../../hooks/files/useUpdateFile"
import { useNavigate, useParams } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

/**
 * Page component for editing an existing file.
 * Fetches the file data by ID, pre-fills the FileForm, and handles the update request.
 */
const EditFilePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: file, isPending: isFetching, isError } = useFile(id!)
    const { mutate: updateFile, isPending } = useUpdateFile()
    const canUpdate = usePermission(ACTIONS.UPDATE_FILE)

    const handleSubmit = (formData: FormData) => {
        updateFile({ id: id!, data: formData }, {
            onSuccess: (res) => {
                toast.success(res.message || "تم تحديث بيانات الملف بنجاح")
                setTimeout(() => {
                    navigate(ROUTES.DASHBOARD.FILES_SHOW.replace(":id", id!))
                }, 1000)
            },
            onError: (error: any) => {
                toast.error(error.message || "فشل تحديث بيانات الملف")
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
                <p className="text-muted-foreground animate-pulse">جاري جلب بيانات الملف...</p>
            </div>
        )
    }

    if (!canUpdate) return <Unauthorized />

    return (
        <>
            <div className="w-full px-3 pt-3 ">
                <DashboardHeader
                    title=" تعديل بيانات الملف "
                    desc={`تعديل بيانات الملف برقم الحصر: ${file?.data?.inventoryNumber || ""}`}
                />
            </div>
            <div className="container mx-auto px-3 animate-in fade-in duration-500">
                <FileForm initialData={file?.data} onSubmit={handleSubmit} isLoading={isPending} />
            </div>
        </>
    )
}

export default EditFilePage