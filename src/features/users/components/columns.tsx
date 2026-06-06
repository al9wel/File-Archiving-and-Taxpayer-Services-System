
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
                role === "Admin" ? "bg-chart-1/10 text-chart-1 hover:bg-chart-1/20 border-chart-1/30" :
                    role === "Manager" ? "bg-chart-5/10 text-chart-5 hover:bg-chart-5/20 border-chart-5/30" :
                        role === "Employee" ? "bg-chart-4/10 text-chart-4 hover:bg-chart-4/20 border-chart-4/30" :
                            role === "Collectors_Manager" ? "bg-chart-2/10 text-chart-2 hover:bg-chart-2/20 border-chart-2/30" :
                                role === "Tax_Payer" ? "bg-chart-6/10 text-chart-6 hover:bg-chart-6/20 border-chart-6/30" :
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