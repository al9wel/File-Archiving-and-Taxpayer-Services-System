import type { CharitableCompanyTaxPayer } from "@/types/CharitableCompanyTaxPayer"
import type { ColumnDef } from "@tanstack/react-table"
import { CharitableCompanyTaxPayerActions } from "./CharitableCompanyTaxPayerActions"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<CharitableCompanyTaxPayer>[] = [

    {
        accessorKey: "userId",
        accessorFn: (row) => row.userInfo.id,
        header: "رقم المستخدم",
    },
    {
        accessorKey: "charitableCompanyId",
        accessorFn: (row) => row.charitableCompanyInfo.id,
        header: "رقم المكلف",
    },
    {
        accessorKey: "fullName",
        accessorFn: (row) => `${row.userInfo.firstName || ""} ${row.userInfo.lastName || ""}`,
        header: "الاسم",
    },
    {
        accessorKey: "fileType",
        accessorFn: (row) => row.taxPayerInfo.fileType,
        header: "نوع الملف",
        cell: ({ row }) => {
            const type = row.original.taxPayerInfo.fileType;
            return <Badge variant="outline" className="rounded-xl px-4 py-1">
                {type === "CharitableCompany" ? "شركة خيرية" : type}
            </Badge>
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
        cell: ({ row }) => <CharitableCompanyTaxPayerActions payer={row.original} />
    }
]
