import DashboardHeader from "@/components/layout/DahsboardHeader"
import { Button } from "@/components/ui/button"

const CreateTaxInfoPage = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-right">
            <DashboardHeader title="إضافة بيانات ضريبية" desc="هذه الصفحة قيد التطوير" />
            <div className="bg-card p-10 rounded-2xl border border-dashed flex flex-col items-center justify-center text-muted-foreground">
                <p className="text-xl font-bold">الميزة قيد التطوير</p>
                <p>سيتم ربطها بالواجهة البرمجية فور جاهزيتها</p>
                <Button className="mt-4" onClick={() => window.history.back()}>رجوع</Button>
            </div>
        </div>
    )
}

export default CreateTaxInfoPage
