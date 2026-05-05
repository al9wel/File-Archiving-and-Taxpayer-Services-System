
import type { OperationReport } from "@/types/OperationReport"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

const getName: Record<string, string> = {
    UserModel: "المستخدمين",
    ActivityTypeModel: "نوع النشاط",
    DepartmentModel: "الأقسام",
    DistrictModel: "الأحياء",
    PaymentTypeModel: "أنواع السداد",
    RegionModel: "المناطق",
    FileModel: "الملفات",
    FileMovementModel: "حركة الملفات",
    RequestModel: "الطلبات",
    TaxpayerModel: "المكلفين",
    TaxCollectorModel: "المأمورين",
    NotificationModel: "الإشعارات",
    JobTypeModel: "نوع التوظيف"
}

export const columns: ColumnDef<OperationReport>[] = [
    {
        accessorKey: "id",
        header: "الرقم",
    },
    {
        accessorKey: "user.name",
        header: "المستخدم",
        cell: ({ row }) => {
            const role = row.original.user.role;
            const roleColor =
                role === "Admin" ? "text-primary" :
                    role === "Manager" ? "text-emerald-600" :
                        role === "Employee" ? "text-blue-600" :
                            "text-muted-foreground";

            return (
                <div className="flex flex-col items-center gap-0.5">
                    <span>{row.original.user.first_name} {row.original.user.last_name}</span>
                    <span className={`text-[10px] font-bold ${roleColor}`}>{role}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "action",
        header: "نوع العملية",
        cell: ({ row }) => {
            const action = row.original.action;
            let badgeClasses = "";

            if (action.includes("إنشاء")) {
                badgeClasses = "bg-emerald-100 text-emerald-700 border-emerald-200";
            } else if (action.includes("حذف")) {
                badgeClasses = "bg-red-100 text-red-700 border-red-200";
            } else if (action.includes("تحديث") || action.includes("تعديل")) {
                badgeClasses = "bg-amber-100 text-amber-700 border-amber-200";
            }

            return (
                <Badge variant="outline" className={`rounded-lg px-2 py-0.5 text-[11px] font-bold ${badgeClasses}`}>
                    {action}
                </Badge>
            )
        }
    },
    {
        accessorKey: "model.id",
        header: "رقم العنصر",
    },
    {
        accessorKey: "model.name",
        header: "العنصر",
        cell: ({ row }) => getName[row.original.model.name] || row.original.model.name
    },
    {
        accessorKey: "details",
        header: "التفاصيل",
        cell: ({ row }) => <span className="max-w-[200px] truncate block mx-auto">{row.original.details}</span>
    },
    {
        accessorKey: "datetime",
        header: "الوقت والتاريخ",
        cell: ({ row }) => <span className="text-xs" dir="ltr">{row.original.datetime}</span>
    }
]
