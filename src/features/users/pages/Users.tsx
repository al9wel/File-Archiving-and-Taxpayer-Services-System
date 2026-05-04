import DashboardHeader from "@/components/layout/DahsboardHeader"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { useUsers } from "../hooks/useUsers"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Main User Management page.
 * Displays a list of all system users in a searchable DataTable and provides
 * access to create, view, edit, and delete operations.
 */
const Users = () => {
    const { data, isLoading, isError } = useUsers()
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <p className="text-red-600 font-bold">حدث خطأ أثناء تحميل البيانات</p>
                <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
            </div>
        );
    }
    return (
        <>

            <div className="w-full px-3 pt-3">
                <DashboardHeader title=" المستخدمين " desc="إدارة جميع المستخدمين في النظام" />
            </div>
            <div className="container mx-auto px-3 animate-in fade-in duration-500">
                {isLoading ? (
                    <div className="flex h-[300px] items-center justify-center">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                ) : (
                    <DataTable columns={columns} data={data?.data || []} />
                )}
            </div>
        </>
    )
}

export default Users
