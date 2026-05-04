import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TaxCollector } from "@/types";
import { TaxCollectorActions } from "./TaxCollectorActions";

interface TaxCollectorsTableProps {
    taxCollectors: TaxCollector[];
}

export const TaxCollectorsTable = ({ taxCollectors }: TaxCollectorsTableProps) => {
    return (
        <div className="rounded-2xl overflow-x-auto border border-gray-100 dark:border-white/5 shadow-sm bg-card">
            <Table>
                <TableHeader className="bg-gray-100 dark:bg-[#101523]">
                    <TableRow>
                        <TableHead className="text-center font-bold">الإسم بالكامل</TableHead>
                        <TableHead className="text-center font-bold">رقم الهاتف</TableHead>
                        <TableHead className="text-center font-bold">نوع التوظيف</TableHead>
                        <TableHead className="text-center font-bold">القسم</TableHead>
                        <TableHead className="text-center w-40 font-bold">إجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {taxCollectors.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                لا يوجد مأمورين مضافين حالياً
                            </TableCell>
                        </TableRow>
                    ) : (
                        taxCollectors.map((collector) => (
                            <TableRow key={collector.id} className="bg-card dark:bg-sidebar hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                                <TableCell className="text-center">{collector.fullName}</TableCell>
                                <TableCell className="text-center font-mono">{collector.phone}</TableCell>
                                <TableCell className="text-center">{collector.jobType?.name}</TableCell>
                                <TableCell className="text-center">{collector.department?.name}</TableCell>
                                <TableCell className="text-center">
                                    <TaxCollectorActions taxCollector={collector} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
