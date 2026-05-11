import { useNavigate } from "react-router-dom"
import { CompanyTaxPayerForm } from "../../../components/tax-payers/company/CompanyTaxPayerForm"
import { useCreateCompanyTaxPayer } from "../../../hooks/tax-payers/company/useCreateCompanyTaxPayer"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"

const CreateCompanyTaxPayerPage = () => {
    const navigate = useNavigate()
    const { mutate: createTaxPayer, isPending } = useCreateCompanyTaxPayer()
    const canCreate = usePermission(ACTIONS.CREATE_TAX_PAYER)

    if (!canCreate) return <Unauthorized />

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (formData: FormData) => {
        createTaxPayer(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة المكلف بنجاح")
                navigate(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.COMPANY.ROOT)
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة المكلف")
            }
        })
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <CompanyTaxPayerForm onSubmit={handleSubmit} isLoading={isPending} />
        </div>
    )
}

export default CreateCompanyTaxPayerPage
