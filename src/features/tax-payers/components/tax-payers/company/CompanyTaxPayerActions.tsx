import { useState } from "react"
import { useDeleteCompanyTaxPayer } from "../../../hooks/tax-payers/company/useDeleteCompanyTaxPayer"

import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Eye, FileText, Pencil, Trash2, Loader2, AlertTriangle } from "lucide-react"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ACTIONS } from "@/constants/permissions"
import { usePermission } from "@/hooks/usePermission"
import type { TaxPayers } from "@/types/TaxPayers"
import { generateSingleTaxPayerReport } from "@/services/reports"

import { companyTaxPayersApi } from "../../../api/companyTaxPayersApi"

export const CompanyTaxPayerActions = ({ taxPayerId, taxPayer }: { taxPayerId: string | number | null; taxPayer?: TaxPayers }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isGeneratingReport, setIsGeneratingReport] = useState(false)
    const deleteCompany = useDeleteCompanyTaxPayer()
    const canUpdate = usePermission(ACTIONS.UPDATE_TAX_PAYER);
    const canDelete = usePermission(ACTIONS.DELETE_TAX_PAYER);
    const canView = usePermission(ACTIONS.VIEW_TAX_PAYER);

    const handleDelete = () => {
        // 1. Delete Company
        deleteCompany.mutate(taxPayerId!, {
            onSuccess: () => {
                toast.success("تم حذف المكلف و بياناته بنجاح")
                setIsOpen(false)
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء حذف بيانات الشركة")
                setIsOpen(false)
            }
        })
    }

    const handleReport = async () => {
        try {
            setIsGeneratingReport(true)
            // Fetch complete company taxpayer details with all documents and relations
            let fullData: any = taxPayer;
            if (taxPayerId) {
                try {
                    const res = await companyTaxPayersApi.getTaxPayer(taxPayerId);
                    if (res?.data) {
                        fullData = res.data;
                    }
                } catch {
                    // fallback to basic data
                }
            }
            await generateSingleTaxPayerReport(fullData)
            toast.success("تم إنشاء تقرير المكلف بنجاح")
        } catch (error: any) {
            toast.error(error.message || "حدث خطأ أثناء إنشاء التقرير")
        } finally {
            setIsGeneratingReport(false)
        }
    }

    return (
        <div className="flex items-center justify-center gap-2">
            {canView && taxPayer && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-emerald-600"
                    onClick={handleReport}
                    disabled={isGeneratingReport}
                    title="تقرير المكلف"
                >
                    {isGeneratingReport ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <FileText className="h-4 w-4" />
                    )}
                </Button>
            )}
            {canView && (
                <NavLink to={ROUTES.DASHBOARD.TAXPAYERS.PAYERS.COMPANY.SHOW.replace(":id", taxPayerId!.toString())}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                        <Eye className="h-4 w-4" />
                    </Button>
                </NavLink>
            )}
            {canUpdate && (
                <NavLink to={ROUTES.DASHBOARD.TAXPAYERS.PAYERS.COMPANY.EDIT.replace(":id", taxPayerId!.toString())}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Pencil className="h-4 w-4" />
                    </Button>
                </NavLink>
            )}
            {canDelete && (
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm" dir="rtl">
                        <AlertDialogHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <AlertDialogTitle className="text-right">حذف المكلف (شركة)</AlertDialogTitle>
                            </div>
                            <AlertDialogDescription className="text-right pt-2 space-y-1">
                                <span className="block">هل أنت متأكد من حذف مكلف من نوع شركة ؟</span>
                                <span className="block text-muted-foreground text-xs pt-1">لا يمكن التراجع عن هذا الإجراء.</span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-row-reverse gap-3">
                            <AlertDialogAction
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleDelete()
                                }}
                                variant="destructive"
                                className="rounded-lg min-w-[100px]"
                                disabled={deleteCompany.isPending}
                            >
                                {deleteCompany.isPending ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>جاري الحذف...</span>
                                    </div>
                                ) : (
                                    "تأكيد الحذف"
                                )}
                            </AlertDialogAction>
                            <AlertDialogCancel
                                className="rounded-lg"
                                disabled={deleteCompany.isPending}
                            >
                                إلغاء
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    )
}
