import type { ColumnDef } from "@tanstack/react-table";
import type { Attachment } from "@/types/Attachment";
import { AttachmentActions } from "./AttachmentActions";

export const columns: ColumnDef<Attachment>[] = [
    {
        accessorKey: "id",
        header: "الرقم",
    },
    {
        accessorKey: "title",
        header: "عنوان المرفق",
    },
    // {
    //     accessorKey: "file.taxNumber",
    //     header: "رقم الملف",
    //     accessorFn: (row) => row.file?.taxNumber || "—",
    // },
    {
        accessorKey: "file.taxPayer.tradeName",
        header: "الاسم التجاري",
        accessorFn: (row) => row.file?.taxPayer?.tradeName || "—",
    },
    // {
    //     accessorKey: "attachmentFile",
    //     header: "الملف",
    //     cell: ({ row }) => {
    //         const fileUrl = row.original.attachmentFile;
    //         if (!fileUrl) return "—";
    //         const fileName = fileUrl.split("/").pop() || "عرض الملف";
    //         return (
    //             <a
    //                 href={fileUrl}
    //                 target="_blank"
    //                 rel="noreferrer"
    //                 className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors"
    //             >
    //                 {fileName}
    //             </a>
    //         );
    //     },
    // },
    {
        id: "actions",
        header: "الإجراءات",
        cell: ({ row }) => <AttachmentActions attachment={row.original} />,
    },
];