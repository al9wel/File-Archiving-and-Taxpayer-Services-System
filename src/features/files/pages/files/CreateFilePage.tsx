import { FileForm } from "../../components/files/FileForm"
import { useCreateFile } from "../../hooks/files/useCreateFile"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"

/**
 * Page component for creating a new file.
 * Wraps the FileForm and handles the creation mutation and redirects.
 */
const CreateFilePage = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { mutate: createFile, isPending } = useCreateFile()
    const canCreate = usePermission(ACTIONS.CREATE_FILE)

    const requestId = searchParams.get("requestId") || null
    const taxPayerId = searchParams.get("taxPayerId") || null
    const handleSubmit = (formData: FormData) => {
        createFile(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة الملف بنجاح")
                setTimeout(() => {
                    navigate(ROUTES.DASHBOARD.FILES_SHOW.replace(":id", res.data.fileInfo.id.toString()))
                }, 1000)
            },
            onError: (error) => {
                toast.error(error.message || "فشل إضافة الملف")
            }
        })
    }

    if (!canCreate) return <Unauthorized />

    return (
        <>
            {/* <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" إضافة ملف "
                    desc="أدخل البيانات الأساسية للملف الجديد."
                />
            </div> */}
            <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
                <FileForm onSubmit={handleSubmit} isLoading={isPending} initialTaxPayerId={taxPayerId} requestId={requestId} />
            </div>
        </>
    )
}

export default CreateFilePage
