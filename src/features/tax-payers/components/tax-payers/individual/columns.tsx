import type { IndividualTaxPayer } from "@/types/IndividualTaxPayer"
import type { ColumnDef } from "@tanstack/react-table"
import { IndividualTaxPayerActions } from "./IndividualTaxPayerActions"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<IndividualTaxPayer>[] = [
    {
        accessorKey: "taxPayerId",
        accessorFn: (row) => row.taxPayer.id,
        header: "رقم المكلف",
    },
    {
        accessorKey: "userId",
        accessorFn: (row) => row.userInfo.id,
        header: "رقم المستخدم",
    },
    {
        accessorKey: "fullName",
        accessorFn: (row) => row.userInfo.fullName,
        header: "الاسم",
    },
    {
        accessorKey: "fileType",
        accessorFn: (row) => row.taxPayer.fileType,
        header: "نوع الملف",
        cell: ({ row }) => {
            const type = row.original.taxPayer.fileType;
            return <Badge variant="outline" className="rounded-xl px-4 py-1">{type === "Individual" ? "فرد" : type}</Badge>
        }
    },
    {
        id: "phone",
        header: "رقم الهاتف",
        accessorFn: (row) => row.userInfo.phone,
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => <IndividualTaxPayerActions payer={row.original} />
    }
]
