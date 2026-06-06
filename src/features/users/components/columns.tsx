
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
                role === "Admin" ? "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200" :
                    role === "Manager" ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200" :
                        role === "Employee" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200" :
                            role === "Collectors_Manager" ? "bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-200" :
                                role === "Tax_Payer" ? "bg-violet-100 text-violet-700 hover:bg-violet-200 border-violet-200" :
                                    "";

            const displayRole = role === "Collectors_Manager" ? "مدير المأمورين" :
                role === "Employee" ? "موظف" :
                    role === "Manager" ? "مدير" :
                        role === "Tax_Payer" ? "مكلف" :
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