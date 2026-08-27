import { FileForm } from "../../components/files/FileForm"
import { useCreateFile } from "../../hooks/files/useCreateFile"
import { useCreateFileWithUser } from "../../hooks/files/useCreateFileWithUser"
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
    const { mutate: createFile, isPending: isPendingFile } = useCreateFile()
    const { mutate: createFileWithUser, isPending: isPendingFileWithUser } = useCreateFileWithUser()
    const canCreate = usePermission(ACTIONS.CREATE_FILE)

    const requestId = searchParams.get("requestId") || null
    const userId = searchParams.get("userId") || searchParams.get("taxPayerId") || null

    const handleSubmit = (formData: FormData, mode: "with-user" | "existing-user" | "edit") => {
        const mutation = mode === "with-user" ? createFileWithUser : createFile

        mutation(formData, {
            onSuccess: (res: any) => {
                toast.success(res.message || "تم إنشاء الملف بنجاح")
                const createdId = res?.data?.id || res?.data?.fileInfo?.id || ""
                setTimeout(() => {
                    if (createdId) {
                        navigate(ROUTES.DASHBOARD.FILES_SHOW.replace(":id", createdId.toString()))
                    } else {
                        navigate(ROUTES.DASHBOARD.FILES.ROOT)
                    }
                }, 1000)
            },
            onError: (error: any) => {
                toast.error(error.message || error.error || "فشل إنشاء الملف")
            }
        })
    }

    if (!canCreate) return <Unauthorized />

    return (
        <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
            <FileForm
                onSubmit={handleSubmit}
                isLoading={isPendingFile || isPendingFileWithUser}
                initialUserId={userId}
                requestId={requestId}
            />
        </div>
    )
}

export default CreateFilePage

