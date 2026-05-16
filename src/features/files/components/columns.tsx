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
        accessorKey: "taxNumber",
        header: "رقم المكلف",
    },
    {
        accessorKey: "taxPayer.tradeName",
        header: "اسم المكلف",
        cell: ({ row }) => <span>{row.original.taxPayer?.tradeName || "-"}</span>
    },
    {
        accessorKey: "department.name",
        header: "القسم",
        cell: ({ row }) => <span>{row.original.department?.name || "-"}</span>
    },
    {
        accessorKey: "fileStatus.name",
        header: "الحالة",
        cell: ({ row }) => {
            const status = row.original.fileStatus?.statusName;
            return <Badge className="rounded-xl px-4 py-1 h-7 min-w-fit w-auto text-xs whitespace-nowrap justify-center leading-none">{status || "-"}</Badge>
        }
    },
    {
        accessorKey: "activityStartDate",
        header: "بداية النشاط",
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => <Actions file={row.original} />
    }
]
