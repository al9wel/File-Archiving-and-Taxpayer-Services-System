import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TaxType } from "@/types/TaxType";
import { TaxTypeActions } from "./TaxTypeActions";

interface TaxTypesTableProps {
    taxTypes: TaxType[];
}

export const TaxTypesTable = ({ taxTypes }: TaxTypesTableProps) => {
    return (
        <div className="rounded-2xl overflow-hidden border-border shadow-sm">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                         <TableHead className="text-center w-24 font-bold text-foreground">رقم</TableHead>
                         <TableHead className="text-center font-bold text-foreground">إسم نوع الضريبة</TableHead>
                         <TableHead className="text-center w-32 font-bold text-foreground">إجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {taxTypes.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                                لا توجد أنواع ضرائب مضافة حالياً
                            </TableCell>
                        </TableRow>
                    ) : (
                        taxTypes.map((type) => (
                            <TableRow key={type.id} className="bg-card hover:bg-muted/50 transition-colors border-b">
                                <TableCell className="text-center font-medium">{type.id}</TableCell>
                                <TableCell className="text-center">{type.name}</TableCell>
                                <TableCell className="text-center">
                                    <TaxTypeActions taxType={type} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
