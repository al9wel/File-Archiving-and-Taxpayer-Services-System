import type { RecycleBin } from "@/types/RecycleBin"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Actions } from "./Actions"

const modelNames: Record<string, string> = {
    UserModel: "المستخدمين",
    ActivityTypeModel: "نوع النشاط",
    DepartmentModel: "الأقسام",
    DistrictModel: "الأحياء",
    PaymentTypeModel: "أنواع السداد",
    RegionModel: "المناطق",
    FileModel: "الملفات",
    FileMovementModel: "حركة الملفات",
    RequestModel: "الطلبات",
    TaxPayerModel: "المكلفين",
    TaxCollectorModel: "المأمورين",
    NotificationModel: "الإشعارات",
    JobTypeModel: "نوع التوظيف",
    TaxInformationModel: "معلومات الضريبة",
    TaxTypeModel: "أنواع الضريبة",
    IndividualModel: "الأفراد",
    CompanyModel: "الشركات",
    CharitableCompanyModel: "الشركات الخيرية",
}

const roleNames: Record<string, string> = {
    Admin: "أدمن",
    Manager: "مدير",
    Employee: "موظف",
    Collectors_Manager: "مدير المأمورين",
}

export const columns: ColumnDef<RecycleBin>[] = [
    {
        accessorKey: "recycle_pin_id",
        header: "الرقم",
    },
    {
        id: "userName",
        accessorFn: (row) => row.user?.name || "",
        header: "المستخدم",
        cell: ({ row }) => {
            const role = row.original.user?.role
            const roleLabel = role ? roleNames[role] || role : "غير متوفر"
            const roleColor =
                role === "Admin" ? "text-primary" :
                    role === "Manager" ? "text-emerald-600" :
                        role === "Employee" ? "text-blue-600" :
                            "text-muted-foreground"

            return (
                <div className="flex flex-col items-center gap-0.5">
                    <span>{row.original.user?.name || "غير متوفر"}</span>
                    <span className={`text-[10px] font-bold ${roleColor}`}>{roleLabel}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "action",
        header: "نوع العملية",
        cell: ({ row }) => (
            <Badge variant="outline" className="rounded-lg px-2 py-0.5 text-[11px] font-bold bg-red-100 text-red-700 border-red-200">
                {row.original.action || "حذف"}
            </Badge>
        ),
    },
    {
        accessorKey: "deleted_record_id",
        header: "رقم العنصر",
    },
    {
        accessorKey: "model",
        header: "العنصر",
        cell: ({ row }) => modelNames[row.original.model] || row.original.model,
    },
    {
        accessorKey: "datetime",
        header: "الوقت والتاريخ",
        cell: ({ row }) => <span className="text-xs" dir="ltr">{row.original.datetime}</span>,
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => <Actions item={row.original} />,
    },
]
