import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Region } from "@/types/Region";
import { RegionActions } from "./RegionActions";

interface RegionsTableProps {
    regions: Region[];
}

export const RegionsTable = ({ regions }: RegionsTableProps) => {
    return (
        <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm">
            <Table>
                <TableHeader className="bg-gray-100 dark:bg-[#101523]">
                    <TableRow>
                        <TableHead className="text-center w-24 font-bold">رقم</TableHead>
                        <TableHead className="text-center font-bold">إسم المنطقة</TableHead>
                        <TableHead className="text-center w-32 font-bold">إجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {regions.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                                لا توجد مناطق مضافة حالياً
                            </TableCell>
                        </TableRow>
                    ) : (
                        regions.map((region) => (
                            <TableRow key={region.id} className="bg-card dark:bg-sidebar hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                                <TableCell className="text-center font-medium">{region.id}</TableCell>
                                <TableCell className="text-center">{region.name}</TableCell>
                                <TableCell className="text-center">
                                    <RegionActions region={region} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
