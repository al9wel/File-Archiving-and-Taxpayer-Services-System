import type { TaxInfo } from "@/types/TaxInfo";
import type { ColumnDef } from "@tanstack/react-table";
import { TaxInfoActions } from "./TaxInfoActions";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TaxInfo>[] = [
    {
        accessorKey: "taxInfoId",
        accessorFn: (row) => row.taxInfo?.id || (row as any).id,
        header: "الرقم",
    },
    {
        accessorKey: "fileId",
        accessorFn: (row) => {
            const taxInfo = row.taxInfo || (row as any);
            const file = taxInfo.file || row.fileInfo;
            return file?.inventoryNumber || file?.taxNumber || taxInfo.fileId || "—";
        },
        header: "رقم الملف",
        cell: ({ row }) => {
            const taxInfo = row.original.taxInfo || (row.original as any);
            const file = taxInfo.file || row.original.fileInfo;
            const fileNum = file?.inventoryNumber ? `حصر: ${file.inventoryNumber}` : file?.taxNumber ? `ضريبي: ${file.taxNumber}` : `#${taxInfo.fileId}`;
            return <span className="font-bold text-xs">{fileNum}</span>;
        }
    },
    {
        id: "owner",
        accessorFn: (row) => {
            const taxInfo = row.taxInfo || (row as any);
            const user = taxInfo.file?.user || (row as any).userInfo;
            return user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.userName : "—";
        },
        header: "المكلف (صاحب الملف)",
        cell: ({ row }) => {
            const taxInfo = row.original.taxInfo || (row.original as any);
            const user = taxInfo.file?.user || row.original.userInfo;
            if (!user) return <span className="text-muted-foreground">—</span>;
            return (
                <div className="flex flex-col text-right">
                    <span className="font-bold text-sm">{user.firstName} {user.lastName}</span>
                    {user.userName && <span className="text-xs text-muted-foreground">@{user.userName}</span>}
                </div>
            );
        }
    },
    {
        accessorKey: "taxTypeName",
        accessorFn: (row) => (row.taxInfo || (row as any)).taxType?.name || "—",
        header: "نوع الضريبة",
        cell: ({ row }) => {
            const taxType = (row.original.taxInfo || (row.original as any)).taxType;
            return <span>{taxType?.name || "—"}</span>;
        }
    },
    {
        accessorKey: "taxAmount",
        accessorFn: (row) => (row.taxInfo || (row as any)).taxAmount,
        header: "مبلغ الضريبة",
        cell: ({ row }) => {
            const amount = (row.original.taxInfo || (row.original as any)).taxAmount;
            return <span className="font-semibold text-destructive">{amount} ريال</span>;
        }
    },
    {
        accessorKey: "lastPayment",
        accessorFn: (row) => (row.taxInfo || (row as any)).lastPayment,
        header: "آخر دفعة",
        cell: ({ row }) => {
            const payment = (row.original.taxInfo || (row.original as any)).lastPayment;
            return <span className="font-semibold text-emerald-600">{payment} ريال</span>;
        }
    },
    {
        accessorKey: "attachment",
        accessorFn: (row) => (row.taxInfo || (row as any)).attachment,
        header: "المرفق",
        cell: ({ row }) => {
            const attachment = (row.original.taxInfo || (row.original as any)).attachment;
            return (
                <Badge variant={attachment ? "default" : "outline"} className="rounded-xl px-3 py-0.5 text-xs">
                    {attachment ? "مرفق" : "لا يوجد"}
                </Badge>
            );
        }
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => <TaxInfoActions taxInfo={row.original} />
    }
];
