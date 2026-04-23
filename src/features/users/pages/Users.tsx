import DashboardHeader from "@/components/layout/DahsboardHeader"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { useUsers } from "../hooks/useUsers"
import { Loader2 } from "lucide-react"

/**
 * Main User Management page.
 * Displays a list of all system users in a searchable DataTable and provides
 * access to create, view, edit, and delete operations.
 */
const Users = () => {
    const { data, isLoading, } = useUsers()
    return (
        <>

            <div className="w-full px-3 pt-3">
                <DashboardHeader title=" المستخدمين " desc="إدارة جميع المستخدمين في النظام" />
            </div>
            <div className="container mx-auto px-3">
                {isLoading ? (
                    <div className="flex h-[300px] items-center justify-center">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                ) : (
                    <DataTable columns={columns} data={data || []} />
                )}
            </div>
        </>
    )
}

export default Users
