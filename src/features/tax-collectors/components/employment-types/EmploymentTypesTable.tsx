import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { EmploymentType } from "@/types";
import { EmploymentTypeActions } from "./EmploymentTypeActions";

interface EmploymentTypesTableProps {
    employmentTypes: EmploymentType[];
}

export const EmploymentTypesTable = ({ employmentTypes }: EmploymentTypesTableProps) => {
    return (
        <div className="rounded-2xl overflow-x-auto border border-gray-100 dark:border-white/5 shadow-sm bg-card">
            <Table>
                <TableHeader className="bg-gray-100 dark:bg-[#101523]">
                    <TableRow>
                        <TableHead className="text-center w-24 font-bold">رقم</TableHead>
                        <TableHead className="text-center font-bold">نوع التوظيف</TableHead>
                        <TableHead className="text-center w-32 font-bold">إجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employmentTypes.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                                لا توجد أنواع توظيف مضافة حالياً
                            </TableCell>
                        </TableRow>
                    ) : (
                        employmentTypes.map((type) => (
                            <TableRow key={type.id} className="bg-card dark:bg-sidebar hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                                <TableCell className="text-center font-medium">{type.id}</TableCell>
                                <TableCell className="text-center">{type.name}</TableCell>
                                <TableCell className="text-center">
                                    <EmploymentTypeActions employmentType={type} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
