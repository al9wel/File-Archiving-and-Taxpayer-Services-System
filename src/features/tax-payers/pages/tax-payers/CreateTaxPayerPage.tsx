import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { toast } from "sonner"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import Unauthorized from "@/app/pages/Unauthorized"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyTaxPayerForm } from "@/features/tax-payers/components/tax-payers/company/CompanyTaxPayerForm"
import { CharitableCompanyTaxPayerForm } from "@/features/tax-payers/components/tax-payers/charitable-company/CharitableCompanyTaxPayerForm"
import { useCreateIndividualTaxPayer } from "../../hooks/tax-payers/individual/useCreateIndividualTaxPayer"
import { useCreateIndividualTaxPayerExisting } from "../../hooks/tax-payers/individual/useCreateIndividualTaxPayerExisting"
import { IndividualTaxPayerForm } from "../../components/tax-payers/individual/IndividualTaxPayerForm"
import { ExistingIndividualTaxPayerForm } from "../../components/tax-payers/individual/ExistingIndividualTaxPayerForm"
import { useCreateCompanyTaxPayer } from "../../hooks/tax-payers/company/useCreateCompanyTaxPayer"
import { useCreateCompanyTaxPayerExisting } from "../../hooks/tax-payers/company/useCreateCompanyTaxPayerExisting"
import { useCreateCharitableCompanyTaxPayer } from "../../hooks/tax-payers/charitable-company/useCreateCharitableCompanyTaxPayer"
import { useCreateCharitableCompanyTaxPayerExisting } from "../../hooks/tax-payers/charitable-company/useCreateCharitableCompanyTaxPayerExisting"
import { ExistingCompanyTaxPayerForm } from "../../components/tax-payers/company/ExistingCompanyTaxPayerForm"
import { ExistingCharitableCompanyTaxPayerForm } from "../../components/tax-payers/charitable-company/ExistingCharitableCompanyTaxPayerForm"

const CreateTaxPayerPage = () => {
    const navigate = useNavigate()
    const { mutate: createIndividualTaxPayer, isPending: isPendingIndividual } = useCreateIndividualTaxPayer()
    const { mutate: createIndividualTaxPayerExisting, isPending: isPendingIndividualExisting } = useCreateIndividualTaxPayerExisting()
    const { mutate: createCompanyTaxPayer, isPending: isPendingCompany } = useCreateCompanyTaxPayer()
    const { mutate: createCompanyTaxPayerExisting, isPending: isPendingCompanyExisting } = useCreateCompanyTaxPayerExisting()
    const { mutate: createCharitableCompanyTaxPayer, isPending: isPendingCharitableCompany } = useCreateCharitableCompanyTaxPayer()
    const { mutate: createCharitableCompanyTaxPayerExisting, isPending: isPendingCharitableCompanyExisting } = useCreateCharitableCompanyTaxPayerExisting()
    const canCreate = usePermission(ACTIONS.CREATE_TAX_PAYER)

    if (!canCreate) return <Unauthorized />

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleIndividualSubmit = (formData: FormData) => {
        createIndividualTaxPayer(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة المكلف بنجاح")
                navigate(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.INDIVIDUAL.SHOW.replace(":id", res.data.taxPayerInfo.id.toString()))
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة المكلف")
            }
        })
    }

    const handleIndividualSubmitExisting = (formData: FormData) => {
        createIndividualTaxPayerExisting(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة المكلف بنجاح")
                navigate(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.INDIVIDUAL.SHOW.replace(":id", res.data.taxPayerInfo.id.toString()))
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة المكلف")
            }
        })
    }

    const handleCompanySubmit = (formData: FormData) => {
        createCompanyTaxPayer(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة المكلف بنجاح")
                navigate(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.COMPANY.SHOW.replace(":id", res.data.companyInfo.id.toString()))
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة المكلف")
            }
        })
    }

    const handleCompanySubmitExisting = (formData: FormData) => {
        createCompanyTaxPayerExisting(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة المكلف بنجاح")
                navigate(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.COMPANY.SHOW.replace(":id", res.data.companyInfo.id.toString()))
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة المكلف")
            }
        })
    }

    const handleCharitableCompanySubmit = (formData: FormData) => {
        createCharitableCompanyTaxPayer(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة المكلف بنجاح")
                navigate(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.CHARITABLE_COMPANY.SHOW.replace(":id", res.data.charitableCompanyInfo.id.toString()))
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة المكلف")
            }
        })
    }

    const handleCharitableCompanySubmitExisting = (formData: FormData) => {
        createCharitableCompanyTaxPayerExisting(formData, {
            onSuccess: (res) => {
                toast.success(res.message || "تم إضافة المكلف بنجاح")
                navigate(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.CHARITABLE_COMPANY.SHOW.replace(":id", res.data.charitableCompanyInfo.id.toString()))
            },
            onError: (error: any) => {
                toast.error(error.message || "حدث خطأ أثناء إضافة المكلف")
            }
        })
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500" dir="rtl">
            <Tabs defaultValue="individual" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mx-auto mb-8">
                    <TabsTrigger value="individual">فرد</TabsTrigger>
                    <TabsTrigger value="company">شركه</TabsTrigger>
                    <TabsTrigger value="charitable-company">شركة خيريه</TabsTrigger>
                </TabsList>
                <TabsContent value="individual" className="animate-in slide-in-from-right-5 duration-300">
                    <Tabs defaultValue="new" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                            <TabsTrigger value="new">إضافة مكلف جديد</TabsTrigger>
                            <TabsTrigger value="existing">ربط بمكلف موجود</TabsTrigger>
                        </TabsList>
                        <TabsContent value="new" className="animate-in slide-in-from-right-5 duration-300">
                            <IndividualTaxPayerForm onSubmit={handleIndividualSubmit} isLoading={isPendingIndividual} />
                        </TabsContent>
                        <TabsContent value="existing" className="animate-in slide-in-from-right-5 duration-300">
                            <h1 className="text-center text-2xl font-bold mb-4">مستخدم موجود</h1>
                            <ExistingIndividualTaxPayerForm onSubmit={handleIndividualSubmitExisting} isLoading={isPendingIndividualExisting} />
                        </TabsContent>
                    </Tabs>
                </TabsContent>
                <TabsContent value="company" className="animate-in slide-in-from-right-5 duration-300">
                    <Tabs defaultValue="new" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                            <TabsTrigger value="new">إضافة مكلف جديد</TabsTrigger>
                            <TabsTrigger value="existing">ربط بمكلف موجود</TabsTrigger>
                        </TabsList>
                        <TabsContent value="new" className="animate-in slide-in-from-right-5 duration-300">
                            <CompanyTaxPayerForm onSubmit={handleCompanySubmit} isLoading={isPendingCompany} />
                        </TabsContent>
                        <TabsContent value="existing" className="animate-in slide-in-from-right-5 duration-300">
                            <h1 className="text-center text-2xl font-bold mb-4">مستخدم موجود</h1>
                            <ExistingCompanyTaxPayerForm onSubmit={handleCompanySubmitExisting} isLoading={isPendingCompanyExisting} />
                        </TabsContent>
                    </Tabs>
                </TabsContent>
                <TabsContent value="charitable-company" className="animate-in slide-in-from-right-5 duration-300">
                    <Tabs defaultValue="new" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                            <TabsTrigger value="new">إضافة مكلف جديد</TabsTrigger>
                            <TabsTrigger value="existing">ربط بمكلف موجود</TabsTrigger>
                        </TabsList>
                        <TabsContent value="new" className="animate-in slide-in-from-right-5 duration-300">
                            <CharitableCompanyTaxPayerForm onSubmit={handleCharitableCompanySubmit} isLoading={isPendingCharitableCompany} />
                        </TabsContent>
                        <TabsContent value="existing" className="animate-in slide-in-from-right-5 duration-300">
                            <h1 className="text-center text-2xl font-bold mb-4">مستخدم موجود</h1>
                            <ExistingCharitableCompanyTaxPayerForm onSubmit={handleCharitableCompanySubmitExisting} isLoading={isPendingCharitableCompanyExisting} />
                        </TabsContent>
                    </Tabs>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default CreateTaxPayerPage
