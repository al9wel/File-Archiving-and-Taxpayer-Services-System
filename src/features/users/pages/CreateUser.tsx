import DashboardHeader from "@/components/layout/DahsboardHeader"
import { UserForm } from "../components/UserForm"
import { useCreateUser } from "../hooks/useCreateUser"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"

/**
 * Page component for creating a new user.
 * Wraps the UserForm and handles the creation mutation and redirects.
 */
const CreateUser = () => {
    const navigate = useNavigate()
    const { mutate: createUser, isPending } = useCreateUser()

    const handleSubmit = (formData: FormData) => {
        createUser(formData, {
            onSuccess: () => {
                toast.success("تم إضافة المستخدم بنجاح")
                setTimeout(() => {
                    navigate(ROUTES.DASHBOARD.USERS)
                }, 1000)
            },
            onError: (error: any) => {
                toast.error(error.message || "فشل إق إضافة المستخدم")
            }
        })
    }

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" إضافة مستخدم "
                    desc="أدخل البيانات الأساسية وحدد الصلاحيات الوظيفية للموظف الجديد."
                />
            </div>
            <div className="container mx-auto px-3">
                <UserForm onSubmit={handleSubmit} isLoading={isPending} />
            </div>
        </>
    )
}

export default CreateUser
