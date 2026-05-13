import { useNavigate, useParams } from "react-router-dom"
import { CompanyTaxPayerForm } from "../../../components/tax-payers/company/CompanyTaxPayerForm"
import { useCompanyTaxPayer } from "../../../hooks/tax-payers/company/useCompanyTaxPayer"
import { useUpdateCompanyTaxPayer } from "../../../hooks/tax-payers/company/useUpdateCompanyTaxPayer"
import { useUpdateIndividualTaxPayer } from "../../../hooks/tax-payers/individual/useUpdateIndividualTaxPayer"
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import ErrorState from "@/app/pages/ErrorState"

const EditCompanyTaxPayerPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: payer, isLoading: isFetching, isError } = useCompanyTaxPayer(id!)
    const { mutate: updateCompany, isPending: isUpdatingCompany } = useUpdateCompanyTaxPayer()
    const { mutate: updateIndividual, isPending: isUpdatingIndividual } = useUpdateIndividualTaxPayer()
    const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser()
    const canUpdate = usePermission(ACTIONS.UPDATE_TAX_PAYER)

    if (!canUpdate) return <Unauthorized />

    if (isError) return <ErrorState />

    const handleSubmit = (formData: FormData) => {
        const userId = payer?.data?.userInfo.id;
        const taxPayerId = payer?.data?.taxPayerInfo.id;
        const companyId = payer?.data?.companyInfo.id;

        // 1. Prepare User Data
        const userFormData = new FormData()
        const userFields = ["firstName", "lastName", "phone", "departmentID", "image", "idCard"]
        userFields.forEach(field => {
            const value = formData.get(field)
            if (value) userFormData.append(field, value)
        })

        // 2. Start Sequential Update (User -> Individual/TaxPayer -> Company)
        updateUser({ id: userId!, data: userFormData }, {
            onSuccess: () => {
                // 3. Prepare Individual (TaxPayer) Data
                const individualFormData = new FormData()
                const individualFields = ["fileType", "commercialRecord", "activityLicense", "tradePict", "insuranceCard", "propertyDocPict"]
                individualFields.forEach(field => {
                    const value = formData.get(field)
                    if (value) individualFormData.append(field, value)
                })
                const tradeNameFromFormData = formData.get("tradeName")
                const tradeNameFromPayer = payer?.data?.taxPayerInfo.tradeName
                const tradeName = tradeNameFromFormData === tradeNameFromPayer ? "" : tradeNameFromFormData
                if (tradeName) individualFormData.append("tradeName", tradeName)

                // 4. Update Individual (TaxPayer)
                updateIndividual({ id: taxPayerId!, data: individualFormData }, {
                    onSuccess: () => {
                        // 5. Prepare Company Data
                        const companyFormData = new FormData()
                        const companyFields = ["articlesOfIncorporation", "govemorLicense", "partnersIDCards"]
                        companyFields.forEach(field => {
                            const value = formData.get(field)
                            if (value) companyFormData.append(field, value)
                        })

                        // 6. Update Company
                        updateCompany({ id: companyId!, data: companyFormData }, {
                            onSuccess: (res) => {
                                toast.success(res.message || "تم تحديث بيانات الشركة بنجاح")
                                setTimeout(() => {
                                    navigate(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.COMPANY.SHOW.replace(":id", companyId!.toString()))
                                }, 1000)
                            },
                            onError: (error: any) => {
                                toast.error(error.message || "حدث خطأ أثناء تحديث بيانات الشركة")
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
                <CompanyTaxPayerForm initialData={payer?.data} onSubmit={handleSubmit} isLoading={isUpdatingCompany || isUpdatingIndividual || isUpdatingUser} />
            )}
        </div>
    )
}

export default EditCompanyTaxPayerPage
