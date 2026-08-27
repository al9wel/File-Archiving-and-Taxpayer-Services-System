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
        id: "inventoryNumber",
        accessorKey: "inventoryNumber",
        header: "رقم الحصر",
        cell: ({ row }) => <span className="font-bold">{row.original.inventoryNumber || "—"}</span>
    },
    {
        id: "taxNumber",
        accessorKey: "taxNumber",
        header: "الرقم الضريبي",
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.taxNumber || "—"}</span>
    },
    {
        id: "user",
        accessorFn: (row) => {
            const user = row.user
            if (!user) return ""
            return `${user.firstName || ""} ${user.lastName || ""} ${user.userName || ""}`.trim()
        },
        header: "المكلف (صاحب الملف)",
        cell: ({ row }) => {
            const user = row.original.user
            if (!user) return <span>—</span>
            return (
                <div className="flex flex-col text-right">
                    <span className="font-bold text-sm">{user.firstName} {user.lastName}</span>
                    {user.userName && <span className="text-xs text-muted-foreground">@{user.userName}</span>}
                </div>
            )
        }
    },
    {
        id: "activities",
        accessorFn: (row) => row.taxPayers?.map(a => a.tradeName).join(", ") || "",
        header: "أنشطة المكلف",
        cell: ({ row }) => {
            const activities = row.original.taxPayers || []
            if (activities.length === 0) {
                return <span className="text-xs text-muted-foreground">لا يوجد أنشطة</span>
            }
            return (
                <div className="flex flex-wrap gap-1 max-w-[220px]">
                    {activities.slice(0, 2).map((act, i) => (
                        <Badge key={i} variant="outline" className="rounded-xl px-2 py-0.5 text-xs truncate max-w-[140px]">
                            {act.tradeName}
                        </Badge>
                    ))}
                    {activities.length > 2 && (
                        <Badge variant="secondary" className="rounded-xl px-1.5 py-0.5 text-xs">
                            +{activities.length - 2}
                        </Badge>
                    )}
                </div>
            )
        }
    },
    {
        id: "activityType",
        accessorFn: (row) => row.activityType?.name || "",
        header: "نوع النشاط",
        cell: ({ row }) => <span>{row.original.activityType?.name || "—"}</span>
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
        id: "department",
        accessorFn: (row) => row.department?.name || "",
        header: "القسم",
        cell: ({ row }) => <span>{row.original.department?.name || "—"}</span>
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => <Actions file={row.original} />
    }
]

