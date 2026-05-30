import type { FileMovement } from "@/types/FileMovments"
import type { ColumnDef } from "@tanstack/react-table"
import { Actions } from "./Actions"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<FileMovement>[] = [
    {
        accessorKey: "id",
        header: "الرقم",
    },
    {
        id: "tradeName",
        accessorFn: (row) => row.file?.taxPayer.tradeName || "",
        header: "الاسم التجاري",
        cell: ({ row }) => <span>{row.original.file?.taxPayer.tradeName || "-"}</span>
    },
    {
        accessorKey: "file.id",
        header: "رقم الملف",
        cell: ({ row }) => <span>{row.original.file?.id || "-"}</span>
    },
    {
        accessorKey: "status",
        header: "حالة الملف",
        filterFn: "equalsString",
        cell: ({ row }) => {
            const status = row.original.status;
            const badgeClasses =
                status === "InsideArchive" ? "bg-emerald-800 hover:bg-emerald-900 text-white border-transparent" :
                    status === "OutsideArchive" ? "bg-yellow-600 hover:bg-yellow-700 text-white border-transparent" :
                        status === "Missing" ? "bg-destructive hover:bg-destructive/90 text-white border-transparent" :
                            "";

            const displayStatus = status === "InsideArchive" ? "داخل الأرشيف" :
                status === "OutsideArchive" ? "خارج الأرشيف" :
                    status === "Missing" ? "مفقود" :
                        status;

            return <Badge className={`rounded-xl px-4 py-1 h-7 min-w-fit w-auto text-xs whitespace-nowrap justify-center leading-none ${badgeClasses}`}>{displayStatus}</Badge>
        }
    },
    {
        id: "taxCollector",
        accessorFn: (row) => row.taxCollector?.id?.toString() || "",
        header: "المأمور",
        filterFn: "equalsString",
        cell: ({ row }) => <span>{row.original.taxCollector?.fullName || "-"}</span>
    },
    {
        accessorKey: "date",
        header: "التاريخ",
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => <Actions fileMovement={row.original} />
    }
]
