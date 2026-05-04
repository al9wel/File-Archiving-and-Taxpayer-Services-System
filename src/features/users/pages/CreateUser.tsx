import DashboardHeader from "@/components/layout/DahsboardHeader"
import { UserForm } from "../components/UserForm"
import { useCreateUser } from "../hooks/useCreateUser"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"

/**
 * Page component for creating a new user.
 * Wraps the UserForm and handles the creation mutation and redirects.
 */
const CreateUser = () => {
    const navigate = useNavigate()
    const { mutate: createUser, isPending } = useCreateUser()
    const canCreate = usePermission(ACTIONS.CREATE_USER)

    const handleSubmit = (formData: FormData) => {
        createUser(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة المستخدم بنجاح")
                setTimeout(() => {
                    navigate(ROUTES.DASHBOARD.USERS)
                }, 1000)
            },
            onError: (error: any) => {
                toast.error(error.message || "فشل إق إضافة المستخدم")
            }
        })
    }

    if (!canCreate) return <Unauthorized />

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" إضافة مستخدم "
                    desc="أدخل البيانات الأساسية وحدد الصلاحيات الوظيفية للموظف الجديد."
                />
            </div>
            <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
                <UserForm onSubmit={handleSubmit} isLoading={isPending} />
            </div>
        </>
    )
}

export default CreateUser
