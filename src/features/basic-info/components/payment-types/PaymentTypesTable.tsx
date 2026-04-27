import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { PaymentType } from "@/types/PaymentType";
import { PaymentTypeActions } from "./PaymentTypeActions";

interface PaymentTypesTableProps {
    paymentTypes: PaymentType[];
}

export const PaymentTypesTable = ({ paymentTypes }: PaymentTypesTableProps) => {
    return (
        <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm">
            <Table>
                <TableHeader className="bg-gray-100 dark:bg-[#101523]">
                    <TableRow>
                        <TableHead className="text-center w-24 font-bold">رقم</TableHead>
                        <TableHead className="text-center font-bold">نوع السداد</TableHead>
                        <TableHead className="text-center font-bold">ملاحظات</TableHead>
                        <TableHead className="text-center w-32 font-bold">إجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paymentTypes.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                لا توجد أنواع سداد مضافة حالياً
                            </TableCell>
                        </TableRow>
                    ) : (
                        paymentTypes.map((type) => (
                            <TableRow key={type.id} className="bg-card dark:bg-sidebar hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                                <TableCell className="text-center font-medium">{type.id}</TableCell>
                                <TableCell className="text-center">{type.name}</TableCell>
                                <TableCell className="text-center text-muted-foreground text-sm">
                                    {type.note || "---"}
                                </TableCell>
                                <TableCell className="text-center">
                                    <PaymentTypeActions paymentType={type} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
