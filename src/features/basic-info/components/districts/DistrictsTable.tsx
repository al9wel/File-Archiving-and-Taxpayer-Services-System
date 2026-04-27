import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { District } from "@/types/District";
import { DistrictActions } from "./DistrictActions";
import { useRegions } from "../../hooks/regions/useRegions";

interface DistrictsTableProps {
    districts: District[];
}

export const DistrictsTable = ({ districts }: DistrictsTableProps) => {
    const { data: regions } = useRegions();

    const getRegionName = (regionID?: number | string) => {
        if (!regionID || !regions) return "غير معروف";
        const region = regions.find(r => r?.id?.toString() === regionID?.toString());
        return region ? region.name : "غير معروف";
    };

    return (
        <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm">
            <Table>
                <TableHeader className="bg-gray-100 dark:bg-[#101523]">
                    <TableRow>
                        <TableHead className="text-center w-24 font-bold">رقم</TableHead>
                        <TableHead className="text-center font-bold">إسم الحي</TableHead>
                        <TableHead className="text-center font-bold">المنطقة</TableHead>
                        <TableHead className="text-center w-32 font-bold">إجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {districts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                لا توجد أحياء مضافة حالياً
                            </TableCell>
                        </TableRow>
                    ) : (
                        districts.map((district) => (
                            <TableRow key={district.id} className="bg-card dark:bg-sidebar hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                                <TableCell className="text-center font-medium">{district.id}</TableCell>
                                <TableCell className="text-center">{district.name}</TableCell>
                                <TableCell className="text-center">
                                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 text-xs font-medium border border-blue-100 dark:border-blue-900/30">
                                        {getRegionName(district.regionID || district.region_id || district.region?.id)}
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <DistrictActions district={district} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
