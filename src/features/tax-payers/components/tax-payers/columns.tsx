import type { TaxPayers } from "@/types/TaxPayers"
import type { ColumnDef } from "@tanstack/react-table"
import { IndividualTaxPayerActions } from "./individual/IndividualTaxPayerActions"
import { CompanyTaxPayerActions } from "./company/CompanyTaxPayerActions"
import { CharitableCompanyTaxPayerActions } from "./charitable-company/CharitableCompanyTaxPayerActions"

import { Badge } from "@/components/ui/badge"
export const columns: ColumnDef<TaxPayers>[] = [

    {
        id: "id",
        accessorFn: (row) => row.taxPayerId,
        header: "الرقم",
    },
    {
        accessorKey: "fullName",
        accessorFn: (row) => row.taxPayerName,
        header: "الاسم",
    },
    {
        accessorKey: "tradeName",
        accessorFn: (row) => row.tradeName,
        header: "الاسم التجاري",
    },
    {
        accessorKey: "fileType",
        accessorFn: (row) => row.taxPayerFileType,
        header: "نوع الملف",
        cell: ({ row }) => {
            const type = row.original.taxPayerFileType;
            return <Badge variant="outline" className="rounded-xl px-4 py-1">{type === "Individual" ? "فرد" : type === "Company" ? "شركة" : "شركة خيريه"}</Badge>
        }
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => {
            if (row.original.taxPayerFileType === "Individual") {
                return <IndividualTaxPayerActions taxPayerId={row.original.taxPayerId} />
            }
            if (row.original.taxPayerFileType === "Company") {
                if (row.original.companyId) {
                    return <CompanyTaxPayerActions taxPayerId={row.original.companyId} />
                }
            }
            if (row.original.taxPayerFileType === "CharitableCompany") {
                if (row.original.charitableCompanyId) {
                    return <CharitableCompanyTaxPayerActions taxPayerId={row.original.charitableCompanyId} />
                }
            }
        }
    }
]
