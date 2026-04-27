import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Department } from "@/types/Department";
import { DepartmentActions } from "./DepartmentActions";

interface DepartmentsTableProps {
    departments: Department[];
}

export const DepartmentsTable = ({ departments }: DepartmentsTableProps) => {
    return (
        <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm">
            <Table>
                <TableHeader className="bg-gray-100 dark:bg-[#101523]">
                    <TableRow>
                        <TableHead className="text-center w-24 font-bold">رقم</TableHead>
                        <TableHead className="text-center font-bold">إسم القسم</TableHead>
                        <TableHead className="text-center w-32 font-bold">إجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {departments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                                لا توجد أقسام مضافة حالياً
                            </TableCell>
                        </TableRow>
                    ) : (
                        departments.map((dept) => (
                            <TableRow key={dept.id} className="bg-card dark:bg-sidebar hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                                <TableCell className="text-center font-medium">{dept.id}</TableCell>
                                <TableCell className="text-center">{dept.name}</TableCell>
                                <TableCell className="text-center">
                                    <DepartmentActions department={dept} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
