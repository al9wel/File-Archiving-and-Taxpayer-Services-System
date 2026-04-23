import DashboardHeader from "@/components/layout/DahsboardHeader"
import { UserForm } from "../components/UserForm"
import { useUser } from "../hooks/useUser"
import { useUpdateUser } from "../hooks/useUpdateUser"
import { useNavigate, useParams } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

/**
 * Page component for editing an existing user.
 * Fetches the user data by ID, pre-fills the UserForm, and handles the update request.
 */
const UpdateUser = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: user, isLoading: isFetching } = useUser(id!)
    const { mutate: updateUser, isPending } = useUpdateUser()

    const handleSubmit = (formData: FormData) => {
        updateUser({ id: id!, data: formData as any }, {
            onSuccess: () => {
                toast.success("تم تحديث بيانات المستخدم بنجاح")
                setTimeout(() => {
                    navigate(ROUTES.DASHBOARD.USERS)
                }, 1000)
            },
            onError: (error: any) => {
                toast.error(error.message || "فشل تحديث بيانات المستخدم")
            }
        })
    }

    if (isFetching) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <>
            <div className="w-full px-3 pt-3 ">
                <DashboardHeader
                    title=" تعديل بيانات المستخدم "
                    desc={`تعديل بيانات الموظف: ${user?.firstName} ${user?.lastName}`}
                />
            </div>
            <div className="container mx-auto px-3">
                <UserForm initialData={user} onSubmit={handleSubmit} isLoading={isPending} />
            </div>
        </>
    )
}

export default UpdateUser
