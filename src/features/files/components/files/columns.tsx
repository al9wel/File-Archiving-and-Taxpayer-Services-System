import type { ColumnDef } from "@tanstack/react-table";
import type { File } from "@/types/File";
import Actions from "./Actions";

export const columns: ColumnDef<File['fileInfo']>[] = [
    {
        accessorKey: "id",
        header: "رقم الملف",
    },
    {
        accessorKey: "taxPayer.tradeName",
        header: "الإسم التجاري",
        accessorFn: (row) => row.taxPayer?.tradeName || "—",
    },
    {
        accessorKey: "activityType.name",
        header: "نوع النشاط",
        accessorFn: (row) => row.activityType?.name || "—",
    },
    {
        accessorKey: "fileStatus.name",
        header: "حالة الملف",
        accessorFn: (row) => row.fileStatus?.name || "—",
    },
    {
        accessorKey: "taxPayer.fileType",
        header: "نوع المكلف",
    },
    {
        accessorKey: "region.name",
        header: "المنطقة",
        accessorFn: (row) => row.region?.name || "—",
    },
    {
        accessorKey: "district.name",
        header: "المديرية",
        accessorFn: (row) => row.district?.name || "—",
    },
    {
        id: "actions",
        header: "الإجراءات",
        cell: ({ row }) => <Actions file={row.original} />,
    },
];