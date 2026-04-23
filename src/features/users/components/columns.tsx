
import type { User } from "@/types/User"
import type { ColumnDef } from "@tanstack/react-table"
import { Actions } from "./Actions"
import { Badge } from "@/components/ui/badge"



export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "الرقم",
    },
    {
        accessorKey: "firstName",
        header: "الاسم",
        cell: ({ row }) => <span>{row.original.firstName} {row.original.lastName}</span>
    },
    {
        accessorKey: "role",
        header: "الوظيفة",
        cell: ({ row }) => {
            const role = row.original.role;
            const badgeClasses =
                role === "Admin" ? "bg-primary hover:bg-primary/90 text-white" :
                    role === "Manager" ? "bg-emerald-800 hover:bg-emerald-900 text-white border-transparent" :
                        role === "Employee" ? "bg-blue-800 hover:bg-blue-900 text-white border-transparent" :
                            "";
            return <Badge className={`rounded-xl px-4 py-1 h-7 w-15 text-xs  leading-none ${badgeClasses}`}>{role}</Badge>
        }
    },
    {
        accessorKey: "userName",
        header: "اسم المستخدم",
    },
    {
        accessorKey: "phone",
        header: "رقم الهاتف",
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => <Actions user={row.original} />
    }

]