
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
                            role === "Collectors_Manager" ? "bg-purple-800 hover:bg-purple-900 text-white border-transparent" :
                                "";

            const displayRole = role === "Collectors_Manager" ? "مدير المأمورين" :
                role === "Employee" ? "موظف" :
                    role === "Manager" ? "مدير" :
                        role === "Admin" ? "ادمن" :
                            role;

            return <Badge className={`rounded-xl px-4 py-1 h-7 min-w-fit w-auto text-xs whitespace-nowrap justify-center leading-none ${badgeClasses}`}>{displayRole}</Badge>
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