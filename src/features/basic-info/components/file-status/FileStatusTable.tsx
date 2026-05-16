import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { FileStatus } from "@/types/FileStatus";
import { FileStatusActions } from "./FileStatusActions";

interface FileStatusTableProps {
    fileStatuses: FileStatus[];
}

export const FileStatusTable = ({ fileStatuses }: FileStatusTableProps) => {
    return (
        <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm">
            <Table>
                <TableHeader className="bg-gray-100 dark:bg-[#101523]">
                    <TableRow>
                        <TableHead className="text-center w-24 font-bold">رقم</TableHead>
                        <TableHead className="text-center font-bold">إسم الحالة</TableHead>
                        <TableHead className="text-center font-bold">الوصف</TableHead>
                        <TableHead className="text-center w-32 font-bold">إجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fileStatuses.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                لا توجد حالات ملف مضافة حالياً
                            </TableCell>
                        </TableRow>
                    ) : (
                        fileStatuses.map((status) => (
                            <TableRow key={status.id} className="bg-card dark:bg-sidebar hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                                <TableCell className="text-center font-medium">{status.id}</TableCell>
                                <TableCell className="text-center font-bold">{status.statusName}</TableCell>
                                <TableCell className="text-center text-muted-foreground max-w-xs truncate">
                                    {status.statusDescription || "—"}
                                </TableCell>
                                <TableCell className="text-center">
                                    <FileStatusActions fileStatus={status} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
