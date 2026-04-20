import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ShieldAlert, ArrowLeft, Home } from "lucide-react"
import { ROUTES } from "@/constants/routes"

const Unauthorized = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4" dir="rtl">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center text-destructive animate-pulse">
                        <ShieldAlert size={48} />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-foreground">403 - وصول غير مصرح</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        عذراً، ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة. يرجى التواصل مع مسؤول النظام إذا كنت تعتقد أن هذا خطأ.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <NavLink to={ROUTES.DASHBOARD.MAIN} className="w-full sm:w-auto">
                        <Button size="lg" className="w-full gap-2 rounded-xl">
                            <Home size={18} />
                            العودة للرئيسية
                        </Button>
                    </NavLink>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto gap-2 rounded-xl"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={18} />
                        الرجوع للخلف
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized
