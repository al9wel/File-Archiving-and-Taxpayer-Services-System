import { useNavigate, useParams } from "react-router-dom"
import { CharitableCompanyTaxPayerForm } from "../../../components/tax-payers/charitable-company/CharitableCompanyTaxPayerForm"
import { useCharitableCompanyTaxPayer } from "../../../hooks/tax-payers/charitable-company/useCharitableCompanyTaxPayer"
import { useUpdateCharitableCompanyTaxPayer } from "../../../hooks/tax-payers/charitable-company/useUpdateCharitableCompanyTaxPayer"
import { useUpdateIndividualTaxPayer } from "../../../hooks/tax-payers/individual/useUpdateIndividualTaxPayer"
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

const EditCharitableCompanyTaxPayerPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: payer, isLoading: isFetching, isError } = useCharitableCompanyTaxPayer(id!)
    const { mutate: updateCharitableCompany, isPending: isUpdatingCharitable } = useUpdateCharitableCompanyTaxPayer()
    const { mutate: updateIndividual, isPending: isUpdatingIndividual } = useUpdateIndividualTaxPayer()
    const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser()
    const canUpdate = usePermission(ACTIONS.UPDATE_TAX_PAYER)

    if (!canUpdate) return <Unauthorized />

    if (isError) return <ErrorState />

    const handleSubmit = (formData: FormData) => {
        const userId = payer?.data?.userInfo.id;
        const taxPayerId = payer?.data?.taxPayerInfo.id;
        const charitableCompanyId = payer?.data?.charitableCompanyInfo.id;

        // 1. Prepare User Data
        const userFormData = new FormData()
        const userFields = ["firstName", "lastName", "phone", "departmentID", "image", "idCard"]
        userFields.forEach(field => {
            const value = formData.get(field)
            if (value) userFormData.append(field, value)
        })

        // 2. Start Sequential Update (User -> Individual/TaxPayer -> CharitableCompany)
        updateUser({ id: userId!, data: userFormData }, {
            onSuccess: () => {
                // 3. Prepare TaxPayer Data
                const taxPayerFormData = new FormData()
                const taxPayerFields = ["fileType", "tradeName", "commercialRecord", "activityLicense", "tradePict", "insuranceCard", "propertyDocPict"]
                taxPayerFields.forEach(field => {
                    const value = formData.get(field)
                    if (value) taxPayerFormData.append(field, value)
                })

                // 4. Update TaxPayer
                updateIndividual({ id: taxPayerId!, data: taxPayerFormData }, {
                    onSuccess: () => {
                        // 5. Prepare Charitable Company Data
                        const charitableCompanyFormData = new FormData()
                        const charitableFields = ["byLawsCopy"]
                        charitableFields.forEach(field => {
                            const value = formData.get(field)
                            if (value) charitableCompanyFormData.append(field, value)
                        })

                        // 6. Update Charitable Company
                        updateCharitableCompany({ id: charitableCompanyId!, data: charitableCompanyFormData }, {
                            onSuccess: (res) => {
                                toast.success(res.message || "تم تحديث بيانات الشركة الخيرية بنجاح")
                                setTimeout(() => {
                                    navigate(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.CHARITABLE_COMPANY.ROOT)
                                }, 1000)
                            },
                            onError: (error: any) => {
                                toast.error(error.message || "حدث خطأ أثناء تحديث بيانات الشركة الخيرية")
                            }
                        })
                    },
                    onError: (error: any) => {
                        toast.error(error.message || "حدث خطأ أثناء تحديث بيانات المكلف")
                    }
                })
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء تحديث بيانات المستخدم")
            }
        })
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {isFetching ? (
                <div className="flex flex-col h-[300px] items-center justify-center space-y-4">
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <p className="text-muted-foreground">جاري جلب بيانات المكلف...</p>
                </div>
            ) : (
                <CharitableCompanyTaxPayerForm initialData={payer?.data} onSubmit={handleSubmit} isLoading={isUpdatingCharitable || isUpdatingIndividual || isUpdatingUser} />
            )}
        </div>
    )
}

export default EditCharitableCompanyTaxPayerPage
