import type { CompanyTaxPayer } from "@/types/CompanyTaxPayer"
import type { ColumnDef } from "@tanstack/react-table"
import { CompanyTaxPayerActions } from "./CompanyTaxPayerActions"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<CompanyTaxPayer>[] = [
    {
        accessorKey: "userId",
        accessorFn: (row) => row.userInfo.id,
        header: "رقم المستخدم",
    },
    {
        accessorKey: "companyId",
        accessorFn: (row) => row.companyInfo?.id,
        header: "رقم المكلف ",
    },
    {
        accessorKey: "fullName",
        accessorFn: (row) => row.userInfo.fullName || `${row.userInfo.firstName} ${row.userInfo.lastName}`,
        header: "الاسم",
    },
    {
        accessorKey: "fileType",
        accessorFn: (row) => row.taxPayerInfo?.fileType,
        header: "نوع الملف",
        cell: ({ row }) => {
            const type = row.original.taxPayerInfo?.fileType;
            return <Badge variant="outline" className="rounded-xl px-4 py-1">{type === "Company" ? "شركة" : type}</Badge>
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
        cell: ({ row }) => <CompanyTaxPayerActions payer={row.original} />
    }
]
