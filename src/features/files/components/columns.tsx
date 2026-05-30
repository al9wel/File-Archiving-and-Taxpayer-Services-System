import type { File } from "@/types/File"
import type { ColumnDef } from "@tanstack/react-table"
import { Actions } from "./Actions"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<File['fileInfo']>[] = [
    {
        accessorKey: "id",
        header: "الرقم",
    },
    {
        id: "tradeName",
        accessorFn: (row) => row.taxPayer?.tradeName || "",
        header: "الاسم التجاري",
        cell: ({ row }) => <span>{row.original.taxPayer?.tradeName || "-"}</span>
    },
    {
        id: "activityType",
        accessorFn: (row) => row.activityType?.id?.toString() || "",
        header: "نوع النشاط",
        filterFn: "equalsString",
        cell: ({ row }) => <span>{row.original.activityType?.name || "-"}</span>
    },
    {
        accessorKey: "fileStatus.statusName",
        header: "حالة الملف",
        cell: ({ row }) => {
            const status = row.original.fileStatus?.statusName;
            return <Badge className="rounded-xl px-4 py-1 h-7 min-w-fit w-auto text-xs whitespace-nowrap justify-center leading-none">{status || "-"}</Badge>
        }
    },
    {
        id: "fileType",
        accessorFn: (row) => row.taxPayer?.fileType || "",
        header: "نوع الملف",
        filterFn: "equalsString",
        cell: ({ row }) => {
            const type = row.original.taxPayer?.fileType
            const label = type === "Individual" ? "فرد" : type === "Company" ? "شركة" : type === "CharitableCompany" ? "خيرية" : "-"
            return <Badge variant="outline" className="rounded-xl px-4 py-1">{label}</Badge>
        }
    },
    {
        id: "region",
        accessorFn: (row) => row.region?.id?.toString() || "",
        header: "المنطقة",
        filterFn: "equalsString",
        cell: ({ row }) => <span>{row.original.region?.name || "-"}</span>
    },
    {
        id: "district",
        accessorFn: (row) => row.district?.id?.toString() || "",
        header: "الحي",
        filterFn: "equalsString",
        cell: ({ row }) => <span>{row.original.district?.name || "-"}</span>
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => <Actions file={row.original} />
    }
]
