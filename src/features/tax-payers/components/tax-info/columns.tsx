import type { TaxInfo } from "@/types/TaxInfo"
import type { ColumnDef } from "@tanstack/react-table"
import { TaxInfoActions } from "./TaxInfoActions"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<TaxInfo>[] = [
    {
        accessorKey: "taxInfoId",
        accessorFn: (row) => row.taxInfo.id,
        header: "رقم البيانات",
    },
    {
        accessorKey: "taxPayerId",
        accessorFn: (row) => row.taxInfo.taxPayerId,
        header: "رقم المكلف",
    },
    {
        accessorKey: "tradeName",
        accessorFn: (row) => row.taxInfo.taxPayer?.tradeName || "—",
        header: "الإسم التجاري",
    },
    {
        accessorKey: "fileType",
        accessorFn: (row) => row.taxInfo.taxPayer?.fileType,
        header: "نوع الملف",
        cell: ({ row }) => {
            const type = row.original.taxInfo.taxPayer?.fileType;
            const labels: Record<string, string> = {
                "Individual": "فرد",
                "Company": "شركة",
                "CharitableCompany": "شركة خيرية"
            };
            return <Badge variant="outline" className="rounded-xl px-4 py-1">{labels[type || ""] || type || "—"}</Badge>
        }
    },
    {
        accessorKey: "taxTypeName",
        accessorFn: (row) => row.taxInfo.taxType.name || "—",
        header: "نو ع الضريبة",
    },
    {
        accessorKey: "taxAmount",
        accessorFn: (row) => row.taxInfo.taxAmount,
        header: "مبلغ الضريبة",
    },
    {
        accessorKey: "lastPayment",
        accessorFn: (row) => row.taxInfo.lastPayment,
        header: "آخر دفعة",
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => <TaxInfoActions taxInfo={row.original} />
    }
]
